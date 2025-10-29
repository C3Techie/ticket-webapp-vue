<!-- src/components/layout/ProtectedRoute.vue -->
<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
  </div>
  <slot v-else-if="isAuthenticated" />
  <div v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';

const { isAuthenticated, isLoading } = useAuth();
const { error } = useToast();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (!isLoading.value && !isAuthenticated.value) {
    error('Session Expired', 'Your session has expired — please log in again.');
    // Pass intended route as ?redirect=...
    router.replace({ path: '/auth/login', query: { redirect: route.fullPath } });
  }
});
</script>