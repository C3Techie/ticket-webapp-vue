<!-- src/components/layout/Hero.vue -->
<template>
  <section class="relative bg-gradient-to-br from-bg-primary to-bg-card overflow-hidden">
  <!-- Decorative circles (responsive, match React) -->
  <div class="absolute top-4 left-4 w-12 h-12 sm:top-8 sm:left-8 sm:w-20 sm:h-20 md:top-10 md:left-10 md:w-24 md:h-24 bg-accent/40 rounded-full border-2 border-accent"></div>
  <div class="absolute bottom-8 right-8 w-20 h-20 sm:bottom-16 sm:right-16 sm:w-32 sm:h-32 md:bottom-20 md:right-20 md:w-36 md:h-36 bg-accent/30 rounded-full border-2 border-accent"></div>
    
  <div class="container py-20 lg:py-32 relative">
      <div class="text-center">

        <Motion
          tag="h1"
          v-in-view
          :initial="{ opacity: 0, y: 20 }"
          :in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5 }"
          class="text-4xl md:text-6xl font-bold text-text-primary mb-6"
        >
          Streamline Your
          <span class="text-accent"> Support</span> Process
        </Motion>


        <Motion
          tag="p"
          v-in-view
          :initial="{ opacity: 0, y: 20 }"
          :in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.1 }"
          class="text-xl text-text-secondary max-w-3xl mx-auto mb-8"
        >
          A modern, intuitive ticket management system that helps teams track, prioritize, 
          and resolve support requests efficiently across all your projects.
        </Motion>


        <Motion
          tag="div"
          v-in-view
          :initial="{ opacity: 0, y: 20 }"
          :in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <router-link to="/auth/signup">
            <button class="px-8 py-3 bg-accent text-white rounded-md text-lg font-medium hover:bg-accent-dark transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
          </router-link>
          <router-link to="/auth/login">
            <button class="px-8 py-3 border border-accent text-accent rounded-md text-lg font-medium hover:bg-accent hover:text-white transition-all duration-200 hover:scale-105 active:scale-95">
              Login to Dashboard
            </button>
          </router-link>
        </Motion>
      </div>
    </div>
    
    <!-- Wavy SVG bottom edge (updated to match React) -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        class="w-full h-10 md:h-16"
      >
        <path 
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
          opacity=".25" 
          class="fill-accent"
        />
        <path 
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
          opacity=".5" 
          class="fill-accent"
        />
        <path 
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
          class="fill-accent"
        />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { Motion } from '@motionone/vue'
</script>