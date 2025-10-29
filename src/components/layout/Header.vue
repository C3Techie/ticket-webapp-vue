<!-- src/components/layout/Header.vue -->
<template>
  <header class="bg-bg-card border-b border-color-border sticky top-0 z-30">
  <div class="container">
      <div class="flex justify-between items-center h-16">
        <router-link 
          to="/" 
          class="flex items-center space-x-2"
          @click="closeMobileMenu"
        >
          <Ticket class="h-8 w-8 text-accent" />
          <span class="text-xl font-bold text-text-primary">TicketFlow</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            :class="navLinkClasses(item.path)"
            class="transition-all duration-200"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Desktop Auth Section -->
        <div class="hidden md:flex items-center space-x-4">
          <div 
            v-if="isAuthenticated" 
            class="flex items-center space-x-2 text-text-secondary"
          >
            <User :size="16" />
            <span class="text-sm">{{ currentUser?.name }}</span>
          </div>
          <Button
            v-if="isAuthenticated"
            variant="outline"
            size="sm"
            @click="handleLogout"
          >
            Logout
          </Button>
          <div v-else class="flex space-x-2">
            <router-link to="/auth/login">
              <Button variant="ghost" size="sm">Login</Button>
            </router-link>
            <router-link to="/auth/signup">
              <Button variant="primary" size="sm">Get Started</Button>
            </router-link>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-2">
          <div v-if="isAuthenticated" class="flex items-center space-x-2 text-text-secondary mr-2">
            <User :size="16" />
            <span class="text-sm">{{ currentUser?.name }}</span>
          </div>
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset transition-colors"
          >
            <Menu v-if="!isMobileMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-64"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100 max-h-64"
        leave-to-class="opacity-0 max-h-0"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-color-border overflow-hidden">
          <nav class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              :class="mobileNavLinkClasses(item.path)"
            >
              {{ item.label }}
            </router-link>
            
            <!-- Mobile Auth Section -->
            <div class="pt-2 border-t border-color-border">
              <Button
                v-if="isAuthenticated"
                @click="handleMobileLogout"
                variant="outline"
                size="sm"
                class="block w-full text-left px-3 py-2 text-base font-medium"
              >
                Logout
              </Button>
              <div v-else class="flex flex-col space-y-2 px-2">
                <router-link to="/auth/login" @click="closeMobileMenu">
                  <Button variant="outline" size="sm" class="w-full justify-center">Login</Button>
                </router-link>
                <router-link to="/auth/signup" @click="closeMobileMenu">
                  <Button size="sm" class="w-full justify-center">Get Started</Button>
                </router-link>
              </div>
            </div>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Ticket, User, Menu, X } from 'lucide-vue-next'
import { useAuth } from '../../composables/useAuth'
import { useToast } from '../../composables/useToast'
import Button from '../ui/Button.vue'

const route = useRoute()
const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()
const { success } = useToast()
const isMobileMenuOpen = ref(false)

// Create local reactive copies of the auth state
const currentUser = ref(user.value)
const authState = ref(isAuthenticated.value)

// Watch for changes in auth state and update local reactive variables
watch([() => user.value, () => isAuthenticated.value], ([newUser, newAuthState]) => {
  currentUser.value = newUser
  authState.value = newAuthState
}, { immediate: true })

const isActive = (path: string) => route.path === path

const navigationItems = computed(() => [
  { path: '/', label: 'Home' },
  ...(isAuthenticated.value ? [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/tickets', label: 'Tickets' },
  ] : [])
])

const navLinkClasses = (path: string) => [
  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
  isActive(path) ? 'text-accent bg-bg-hover' : 'text-text-secondary hover:text-text-primary'
]

const mobileNavLinkClasses = (path: string) => [
  'block px-3 py-2 rounded-md text-base font-medium transition-colors',
  isActive(path) ? 'text-accent bg-bg-hover' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  logout()
  success('Logged out', 'You have been successfully logged out.')
}

const handleMobileLogout = () => {
  closeMobileMenu()
  handleLogout()
}
</script>