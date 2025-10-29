<!-- src/components/ui/Input.vue -->
<template>
  <label
    v-if="label"
    class="block text-sm font-medium text-text-secondary"
  >
    {{ label }}
  </label>
  <div class="relative">
    <input
      :class="inputClasses"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <component
      :is="icon"
      v-if="icon"
      :size="16"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
    />
  </div>
  <p
    v-if="error"
    class="text-sm text-red-400"
  >
    {{ error }}
  </p>
</template>

<script setup lang="ts">

interface Props {
  label?: string;
  error?: string;
  icon?: any;
  modelValue?: string;
}

const props = defineProps<Props>();

const inputClasses = `
  w-full px-3 py-2 bg-bg-card border rounded-md
  text-text-primary placeholder-text-muted
  focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
  transition-all duration-200
  ${props.icon ? 'pl-10' : ''}
  ${props.error ? 'border-red-500' : 'border-color-border'}
`;
</script>