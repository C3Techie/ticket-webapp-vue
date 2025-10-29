<!-- src/components/ui/ToastContainer.vue -->
<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
    <TransitionGroup
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="toastClasses(toast.type)"
        class="transition-all duration-300"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h4 class="font-semibold text-sm">{{ toast.title }}</h4>
            <p v-if="toast.message" class="text-sm text-text-secondary mt-1">
              {{ toast.message }}
            </p>
          </div>
          <button
            @click="removeToast(toast.id)"
            class="ml-4 flex-shrink-0 text-text-secondary hover:text-text-primary transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X :size="16" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { useToast } from '../../composables/useToast'

const { toasts, removeToast } = useToast()

const toastClasses = (type: string) => {
  const base = 'p-4 rounded-md border-l-4 shadow-xl text-text-primary bg-bg-card'
  const types = {
    success: `${base} bg-green-500 border-green-500`,
    error: `${base} bg-red-500 border-red-500`,
    warning: `${base} bg-yellow-500 border-yellow-500`,
    info: `${base} bg-accent border-accent`,
  }
  return types[type as keyof typeof types] || types.info
}
</script>