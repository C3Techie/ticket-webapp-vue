<!-- src/components/tickets/TicketForm.vue -->
<template>
  <div class="max-h-[70vh] overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-bg-card scrollbar-thumb-rounded scrollbar-track-rounded">
    <form @submit.prevent="handleSubmit" class="space-y-4 pr-2">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-text-secondary">
          Title *
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Enter ticket title"
          class="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          :class="{ 'border-red-500': errors.title }"
        />
        <p v-if="errors.title" class="text-sm text-red-400">
          {{ errors.title }}
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium text-text-secondary mb-2">
          Description
        </label>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Enter ticket description (optional)"
          class="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
          :class="{ 'border-red-500': errors.description }"
        />
        <p v-if="errors.description" class="text-sm text-red-400 mt-1">
          {{ errors.description }}
        </p>
        <p class="text-xs text-text-muted mt-1">
          {{ form.description?.length || 0 }}/1000 characters
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-2">
            Status *
          </label>
          <select
            v-model="form.status"
            class="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-text-secondary mb-2">
            Priority
          </label>
          <select
            v-model="form.priority"
            class="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-text-secondary">
          Reporter
        </label>
        <input
          v-model="form.reporter"
          type="text"
          placeholder="Enter reporter name (optional)"
          class="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
        />
      </div>

      <!-- Sticky buttons at the bottom -->
      <div class="flex justify-end space-x-3 pt-4 pb-2 sticky bottom-0 bg-bg-card -mx-2 px-2 -mb-2">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 border border-color-border text-text-secondary rounded-md hover:bg-bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
        >
          <svg
            v-if="loading"
            class="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {{ ticket ? 'Update Ticket' : 'Create Ticket' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Ticket } from '../../types';

interface Props {
  ticket?: Ticket | null;
  loading?: boolean;
}

interface Emits {
  (e: 'submit', data: any): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  ticket: null,
  loading: false,
});

const emit = defineEmits<Emits>();

const form = reactive({
  title: '',
  description: '',
  status: 'open' as Ticket['status'],
  priority: '' as Ticket['priority'],
  reporter: '',
});

const errors = reactive({
  title: '',
  description: '',
});

watch(() => props.ticket, (newTicket) => {
  if (newTicket) {
    form.title = newTicket.title;
    form.description = newTicket.description || '';
    form.status = newTicket.status;
    form.priority = newTicket.priority || '';
    form.reporter = newTicket.reporter || '';
  } else {
    // Reset form for new ticket
    form.title = '';
    form.description = '';
    form.status = 'open';
    form.priority = '';
    form.reporter = '';
  }
}, { immediate: true });

const validateForm = () => {
  let isValid = true;
  errors.title = '';
  errors.description = '';

  if (!form.title.trim()) {
    errors.title = 'Title is required';
    isValid = false;
  } else if (form.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
    isValid = false;
  } else if (form.title.length > 150) {
    errors.title = 'Title must be less than 150 characters';
    isValid = false;
  }

  if (form.description && form.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (!validateForm()) return;

  const submitData = {
    title: form.title,
    description: form.description || undefined,
    status: form.status,
    priority: form.priority || undefined,
    reporter: form.reporter || undefined,
  };

  emit('submit', submitData);
};
</script>