<!-- src/components/ui/Modal.vue -->
<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="onClose"
    />
  </Transition>

  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 scale-95 translate-y-4"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-95 translate-y-4"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Modal dialog"
    >
      <div
        class="bg-bg-card rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
        @click.stop
      >
        <div class="flex items-center justify-between p-6 border-b border-color-border">
          <h2 class="text-lg font-semibold text-text-primary">{{ title }}</h2>
          <button
            @click="onClose"
            class="text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close modal"
          >
            <X :size="20" aria-hidden="true" focusable="false" />
          </button>
        </div>
        <div class="p-6 overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

defineProps<Props>();
</script>