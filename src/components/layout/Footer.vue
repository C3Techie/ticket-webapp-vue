<!-- src/components/layout/Footer.vue -->
<template>
  <footer class="bg-bg-card border-t border-color-border mt-auto">
  <div class="container py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <Ticket class="h-6 w-6 text-accent" />
          <span class="text-lg font-semibold text-text-primary">TicketFlow</span>
        </div>
        
        <div class="text-text-secondary text-sm">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Ticket } from 'lucide-vue-next';
</script>