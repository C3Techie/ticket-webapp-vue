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
          <p>&copy; 2024 TicketFlow. All rights reserved.</p>
        </div>
        
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-text-secondary hover:text-accent transition-colors text-sm">
            Privacy
          </a>
          <a href="#" class="text-text-secondary hover:text-accent transition-colors text-sm">
            Terms
          </a>
          <a href="#" class="text-text-secondary hover:text-accent transition-colors text-sm">
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Ticket } from 'lucide-vue-next';
</script>