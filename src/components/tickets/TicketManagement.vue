<!-- src/components/tickets/TicketManagement.vue -->
<template>
  <div class="min-h-screen bg-bg-primary">
  <div class="container py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-text-primary">Ticket Management</h1>
          <p class="text-text-secondary mt-2">
            Create and manage support tickets for your projects
          </p>
        </div>
        <button
          @click="showForm = true"
          class="mt-4 sm:mt-0 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
        >
          <Plus :size="20" class="mr-2" />
          New Ticket
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <div class="flex-1">
          <div class="space-y-2">
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search tickets..."
                class="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 pl-10"
              />
              <Search :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            </div>
          </div>
        </div>
        <select
          v-model="statusFilter"
          class="px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <!-- Tickets Grid -->
      <div v-if="filteredTickets.length === 0" class="text-center py-12">
        <div class="text-text-muted mb-4">
          <TicketIcon class="mx-auto h-12 w-12 mb-4" />
          <p class="text-lg">No tickets found</p>
          <p class="text-sm mt-2">
            {{ tickets.length === 0 ? 'Get started by creating your first ticket.' : 'Try adjusting your search or filter criteria.' }}
          </p>
        </div>
        <button
          v-if="tickets.length === 0"
          @click="showForm = true"
          class="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Create Your First Ticket
        </button>
      </div>

      <Motion
        layout
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"
      >
        <TicketCard
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </Motion>

      <!-- Create/Edit Modal -->
      <div
        v-if="showForm || editingTicket"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
        @click="closeForm"
      >
        <div
          class="bg-bg-card rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
          @click.stop
        >
          <div class="flex items-center justify-between p-6 border-b border-color-border">
            <h2 class="text-lg font-semibold text-text-primary">
              {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
            </h2>
            <button
              @click="closeForm"
              class="text-text-secondary hover:text-text-primary transition-colors"
            >
              <X :size="20" />
            </button>
          </div>
          <div class="p-6">
            <TicketForm
              :ticket="editingTicket"
              :loading="formLoading"
              @submit="handleFormSubmit"
              @cancel="closeForm"
            />
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="deletingTicketId"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
        @click="deletingTicketId = null"
      >
        <div
          class="bg-bg-card rounded-xl shadow-xl max-w-md w-full"
          @click.stop
        >
          <div class="flex items-center justify-between p-6 border-b border-color-border">
            <h2 class="text-lg font-semibold text-text-primary">Confirm Deletion</h2>
            <button
              @click="deletingTicketId = null"
              class="text-text-secondary hover:text-text-primary transition-colors"
            >
              <X :size="20" />
            </button>
          </div>
          <div class="p-6 space-y-4">
            <p class="text-text-secondary">
              Are you sure you want to delete this ticket? This action cannot be undone.
            </p>
            <div class="flex justify-end space-x-3">
              <button
                @click="deletingTicketId = null"
                class="px-4 py-2 border border-color-border text-text-secondary rounded-md hover:bg-bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Plus, Search, X, Ticket as TicketIcon } from 'lucide-vue-next';
import { useTickets } from '../../composables/useTickets';
import { useToast } from '../../composables/useToast';
import type { Ticket } from '../../types';
import TicketCard from './TicketCard.vue';
import TicketForm from './TicketForm.vue';
import { Motion } from '@motionone/vue';

const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();
const { success, error } = useToast();

const showForm = ref(false);
const editingTicket = ref<Ticket | null>(null);
const deletingTicketId = ref<string | null>(null);
const searchTerm = ref('');
const statusFilter = ref('all');
const formLoading = ref(false);

const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         ticket.description?.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesStatus = statusFilter.value === 'all' || ticket.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const handleEdit = (ticket: Ticket) => {
  editingTicket.value = ticket;
};

const handleDelete = (ticketId: string) => {
  deletingTicketId.value = ticketId;
};

const closeForm = () => {
  showForm.value = false;
  editingTicket.value = null;
};

const handleFormSubmit = async (data: any) => {
  formLoading.value = true;

  try {
    if (editingTicket.value) {
      updateTicket(editingTicket.value.id, data);
      success('Ticket Updated', 'The ticket has been updated successfully.');
    } else {
      createTicket(data);
      success('Ticket Created', 'The ticket has been created successfully.');
    }
    closeForm();
  } catch (err) {
    error('Operation Failed', 'There was an issue processing your request.');
  } finally {
    formLoading.value = false;
  }
};

const confirmDelete = async () => {
  if (!deletingTicketId.value) return;

  try {
    deleteTicket(deletingTicketId.value);
    success('Ticket Deleted', 'The ticket has been deleted successfully.');
    deletingTicketId.value = null;
  } catch (err) {
    error('Deletion Failed', 'There was an issue deleting the ticket.');
  }
};
</script>