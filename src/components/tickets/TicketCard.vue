<!-- src/components/tickets/TicketCard.vue -->
<template>
  <Motion
    layout
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    :exit="{ opacity: 0, scale: 0.95 }"
    class="bg-bg-card rounded-lg p-6 shadow-md border border-color-border hover:shadow-lg transition-all duration-200"
  >
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-lg font-semibold text-text-primary flex-1 pr-4">
        {{ ticket.title }}
      </h3>
      <div class="flex space-x-2">
        <button
          @click="$emit('edit', ticket)"
          class="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Edit ticket"
        >
          <Edit2 :size="16" aria-hidden="true" focusable="false" />
        </button>
        <button
          @click="$emit('delete', ticket.id)"
          class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          aria-label="Delete ticket"
        >
          <Trash2 :size="16" aria-hidden="true" focusable="false" />
        </button>
      </div>
    </div>

    <p v-if="ticket.description" class="text-text-secondary text-sm mb-3 line-clamp-2">
      {{ ticket.description }}
    </p>

    <div class="flex flex-wrap gap-2 mb-3">
      <span :class="statusClasses">
        <component :is="statusIcon" :size="16" class="mr-1" aria-hidden="true" focusable="false" />
        <span class="ml-1 capitalize">{{ formattedStatus }}</span>
      </span>

      <span v-if="ticket.priority" :class="priorityClasses">
        <span class="capitalize">{{ formattedPriority }}</span>
      </span>
    </div>

    <div class="flex justify-between items-center text-xs text-text-muted mt-2">
      <span>Created: {{ formatDate(ticket.created_at) }}</span>
      <span v-if="ticket.reporter">By: {{ ticket.reporter }}</span>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Edit2, Trash2, AlertCircle, Clock, CheckCircle } from 'lucide-vue-next';
import { Motion } from '@motionone/vue';
import type { Ticket } from '../../types';


interface Props {
  ticket: Ticket;
}

interface Emits {
  (e: 'edit', ticket: Ticket): void;
  (e: 'delete', ticketId: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const statusIcon = computed(() => {
  switch (props.ticket.status) {
    case 'open': return AlertCircle;
    case 'in_progress': return Clock;
    case 'closed': return CheckCircle;
    default: return AlertCircle;
  }
});

const formattedStatus = computed(() => {
  return props.ticket.status.replace('_', ' ');
});

const formattedPriority = computed(() => {
  return props.ticket.priority ? props.ticket.priority.charAt(0).toUpperCase() + props.ticket.priority.slice(1) : '';
});

const statusClasses = computed(() => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  switch (props.ticket.status) {
    case 'open':
      return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
    case 'in_progress':
      return `${base} bg-yellow-500/20 text-yellow-400 border-yellow-500/30`;
    case 'closed':
      return `${base} bg-gray-500/20 text-gray-400 border-gray-500/30`;
    default:
      return base;
  }
});

const priorityClasses = computed(() => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  switch (props.ticket.priority) {
    case 'high':
      return `${base} bg-red-500/20 text-red-400 border-red-500/30`;
    case 'medium':
      return `${base} bg-yellow-500/20 text-yellow-400 border-yellow-500/30`;
    case 'low':
      return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
    default:
      return `${base} bg-gray-500/20 text-gray-400 border-gray-500/30`;
  }
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
</script>