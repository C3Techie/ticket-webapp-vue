import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LandingPage.vue'),
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../components/auth/LoginForm.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: () => import('../components/auth/SignupForm.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('../components/tickets/TicketManagement.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { useToast } from '../composables/useToast';

router.beforeEach((to, from, next) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value && !isLoading.value) {
    // Always show toast on unauthenticated access to protected route
    const toast = useToast();
    toast.error('Session Expired', 'Your session has expired — please log in again.');
    next(false); // Abort navigation so toast can show
    setTimeout(() => {
      router.replace({ path: '/auth/login', query: { redirect: to.fullPath } });
    }, 200); // 200ms delay to allow toast to render
    return;
  }
  if (to.meta.requiresGuest && isAuthenticated.value) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;