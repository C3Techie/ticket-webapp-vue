<!-- src/views/LandingPage.vue -->
<template>
  <div class="flex flex-col">
    <Hero />
    
    <!-- Features Section -->
    <section class="py-20 bg-bg-primary">
  <div class="container">
        <div class="text-center mb-16">
          <Motion
            tag="h2"
            v-in-view
            :initial="{ opacity: 0, y: 20 }"
            :in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5 }"
            class="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Why Choose TicketFlow?
          </Motion>
          <Motion
            tag="p"
            v-in-view
            :initial="{ opacity: 0, y: 20 }"
            :in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 0.1 }"
            class="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Built with modern technology and user experience in mind, 
            TicketFlow helps teams deliver exceptional support.
          </Motion>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Motion
            v-for="(feature, index) in features"
            :key="feature.title"
            tag="div"
            v-in-view
            :initial="{ opacity: 0, y: 20 }"
            :in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
            :whileHover="{ y: -5 }"
            class="bg-bg-card rounded-xl p-6 shadow-md border border-color-border hover:shadow-lg transition-all duration-200"
          >
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <component :is="feature.icon" class="h-6 w-6 text-accent" />
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-text-secondary">
              {{ feature.description }}
            </p>
          </Motion>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-bg-card">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Motion
          tag="div"
          v-in-view
          :initial="{ opacity: 0, y: 20 }"
          :in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5 }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Ready to Streamline Your Support?
          </h2>
          <p class="text-xl text-text-secondary mb-8">
            Join thousands of teams using TicketFlow to manage their support tickets efficiently.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Motion
              tag="a"
              href="/auth/signup"
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              class="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-lg transition-all duration-200"
            >
              Get Started Free
            </Motion>
            <Motion
              tag="a"
              href="/auth/login"
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              class="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
            >
              Login to Dashboard
            </Motion>
          </div>
        </Motion>
      </div>
    </section>
  </div>
</template>

<script setup>
import Hero from '../components/layout/Hero.vue'
import { Shield, Zap, Users } from 'lucide-vue-next'
import { Motion } from '@motionone/vue'

const features = [
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with reliable ticket tracking and data protection.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Quick response times and smooth performance for efficient support management.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless collaboration between team members with real-time updates.',
  },
]
</script>