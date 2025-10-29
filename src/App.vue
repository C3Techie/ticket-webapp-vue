<!-- src/App.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-bg-primary">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import ToastContainer from './components/ui/ToastContainer.vue';
</script>