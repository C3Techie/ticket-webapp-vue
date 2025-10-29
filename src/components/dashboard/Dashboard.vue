<!-- src/components/dashboard/Dashboard.vue -->
<template>
  <div class="min-h-screen bg-bg-primary">
  <div class="container py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p class="text-text-secondary mt-2">
          Overview of your support tickets and their status
        </p>
      </div>

      <!-- Stats Grid with Motion -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Motion
          v-for="(card, idx) in statCards"
          :key="card.title"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.05 * idx }"
        >
          <StatsCard
            :title="card.title"
            :value="card.value"
            :icon="card.icon"
            :description="card.description"
            :color="card.color"
          />
        </Motion>
      </div>

      <!-- Quick Actions with Motion -->
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.2 }"
      >
        <div class="bg-bg-card rounded-xl p-6 shadow-md border border-color-border">
          <div class="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold text-text-primary mb-2">
                Ticket Management
              </h2>
              <p class="text-text-secondary">
                Create, view, and manage all your support tickets in one place.
              </p>
            </div>
            <router-link to="/tickets" class="mt-4 sm:mt-0">
              <button class="px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-dark transition-all duration-200 hover:scale-105 active:scale-95">
                Manage Tickets
              </button>
            </router-link>
          </div>
        </div>
      </Motion>

      <!-- Recent Activity Feed with Motion -->
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3 }"
        class="mt-8"
      >
        <div class="bg-bg-card rounded-xl p-6 shadow-md border border-color-border">
          <h3 class="text-lg font-semibold text-text-primary mb-4">
            Recent Activity
          </h3>
          <div v-if="activity.length === 0" class="text-center py-8">
            <Ticket class="mx-auto h-12 w-12 text-text-muted mb-4" />
            <p class="text-text-secondary">
              Recent ticket activity will appear here
            </p>
          </div>
          <ul v-else class="divide-y divide-color-border">
            <li v-for="act in activity" :key="act.id" class="py-3 flex items-center gap-3">
              <AlertCircle v-if="act.type === 'created'" class="text-green-400" aria-hidden="true" />
              <Clock v-else-if="act.type === 'updated'" class="text-yellow-400" aria-hidden="true" />
              <CheckCircle v-else-if="act.type === 'deleted'" class="text-gray-400" aria-hidden="true" />
              <span class="flex-1 text-text-primary">
                <span class="capitalize">{{ act.type }}</span> ticket <span class="font-semibold">{{ act.title }}</span>
              </span>
              <span class="text-xs text-text-muted">{{ formatDateTime(act.timestamp) }}</span>
            </li>
          </ul>
        </div>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Ticket, Clock, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { useTickets } from '../../composables/useTickets'
import { Motion } from '@motionone/vue'
import StatsCard from './StatsCard.vue'
import { ref, onMounted } from 'vue'

const { getTicketStats, getRecentActivity } = useTickets()
const stats = getTicketStats

const activity = ref([])
onMounted(() => {
  activity.value = getRecentActivity()
})

function formatDateTime(ts) {
  return new Date(ts).toLocaleString()
}

const statCards = [
  {
    title: 'Total Tickets',
    get value() { return stats.value.total },
    icon: Ticket,
    description: 'All tickets',
    color: 'blue',
  },
  {
    title: 'Open',
    get value() { return stats.value.open },
    icon: AlertCircle,
    description: 'Needs attention',
    color: 'green',
  },
  {
    title: 'In Progress',
    get value() { return stats.value.inProgress },
    icon: Clock,
    description: 'Being worked on',
    color: 'yellow',
  },
  {
    title: 'Resolved',
    get value() { return stats.value.closed },
    icon: CheckCircle,
    description: 'Completed',
    color: 'gray',
  },
]
</script>