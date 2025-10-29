<!-- src/components/dashboard/StatsCard.vue -->
<template>
  <Motion
    while-hover="{ y: -2 }"
    class="bg-bg-card rounded-xl p-6 shadow-md border border-color-border hover:shadow-lg transition-all duration-200"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-text-secondary text-sm font-medium">{{ title }}</p>
        <p class="text-3xl font-bold text-text-primary my-2">{{ value }}</p>
        <p class="text-text-muted text-sm">{{ description }}</p>
      </div>
      <div :class="iconContainerClasses">
        <component :is="icon" :size="24" />
      </div>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'

interface Props {
  title: string;
  value: number;
  icon: any;
  description: string;
  color: 'green' | 'yellow' | 'blue' | 'gray';
}

const props = defineProps<Props>();

const colorClasses = {
  green: 'text-status-open bg-status-open/10',
  yellow: 'text-status-in-progress bg-status-in-progress/10',
  blue: 'text-accent bg-accent/10',
  gray: 'text-status-closed bg-status-closed/10',
};

const iconContainerClasses = `p-3 rounded-lg ${colorClasses[props.color]}`;
</script>