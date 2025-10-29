import { ref, computed, watch } from 'vue';
import type { Ticket, TicketActivity } from '../types';
import { storage } from '../utils/storage';
import { useAuth } from './useAuth';

export function useTickets() {
  const tickets = ref<Ticket[]>([]);
  const isLoading = ref(true);
  const { user } = useAuth();

  // Helper functions to get user-specific storage keys
  const getUserTicketsKey = () => user.value ? `ticketapp_tickets_${user.value.id}` : 'ticketapp_tickets_anon';
  const getUserActivityKey = () => user.value ? `ticketapp_activity_${user.value.id}` : 'ticketapp_activity_anon';

  // Activity functions (now user-specific)
  const addActivity = (activity: TicketActivity) => {
    const key = getUserActivityKey();
    const activities: TicketActivity[] = storage.get(key) || [];
    activities.unshift(activity);
    storage.set(key, activities.slice(0, 10)); // keep last 10
  };

  const getRecentActivity = (): TicketActivity[] => {
    const key = getUserActivityKey();
    return storage.get(key) || [];
  };

  // Migrate old shared data to user-specific on first login
  const migrateOldData = () => {
    if (!user.value) return;
    
    // Migrate tickets
    const oldTickets = storage.get<Ticket[]>('ticketapp_tickets');
    if (oldTickets && oldTickets.length > 0) {
      storage.set(getUserTicketsKey(), oldTickets);
      storage.remove('ticketapp_tickets');
    }
    
    // Migrate activity
    const oldActivity = storage.get<TicketActivity[]>('ticketapp_activity');
    if (oldActivity && oldActivity.length > 0) {
      storage.set(getUserActivityKey(), oldActivity);
      storage.remove('ticketapp_activity');
    }
  };

  // Load tickets for the current user
  const loadTickets = () => {
    if (!user.value) {
      tickets.value = [];
      isLoading.value = false;
      return;
    }
    
    migrateOldData();
    const storedTickets = storage.get<Ticket[]>(getUserTicketsKey()) || [];
    tickets.value = storedTickets;
    isLoading.value = false;
  };

  // Watch for user changes and reload tickets
  watch(user, () => {
    isLoading.value = true;
    loadTickets();
  }, { immediate: true });

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    tickets.value = [...tickets.value, newTicket];
    storage.set(getUserTicketsKey(), tickets.value);
    addActivity({
      id: Date.now().toString(),
      type: 'created',
      ticketId: newTicket.id,
      title: newTicket.title,
      timestamp: newTicket.created_at,
    });
    return newTicket;
  };

  const updateTicket = (id: string, updates: Partial<Omit<Ticket, 'id' | 'created_at'>>) => {
    tickets.value = tickets.value.map(ticket =>
      ticket.id === id
        ? { ...ticket, ...updates, updated_at: new Date().toISOString() }
        : ticket
    );
    storage.set(getUserTicketsKey(), tickets.value);
    const updated = tickets.value.find(t => t.id === id);
    if (updated) {
      addActivity({
        id: Date.now().toString(),
        type: 'updated',
        ticketId: updated.id,
        title: updated.title,
        timestamp: updated.updated_at,
      });
    }
  };

  const deleteTicket = (id: string) => {
    const ticket = tickets.value.find(t => t.id === id);
    tickets.value = tickets.value.filter(ticket => ticket.id !== id);
    storage.set(getUserTicketsKey(), tickets.value);
    if (ticket) {
      addActivity({
        id: Date.now().toString(),
        type: 'deleted',
        ticketId: ticket.id,
        title: ticket.title,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const getTicketStats = computed(() => {
    const total = tickets.value.length;
    const open = tickets.value.filter(t => t.status === 'open').length;
    const inProgress = tickets.value.filter(t => t.status === 'in_progress').length;
    const closed = tickets.value.filter(t => t.status === 'closed').length;

    return { total, open, inProgress, closed };
  });

  return {
    tickets,
    isLoading,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketStats,
    refetch: loadTickets,
    getRecentActivity,
  };
}