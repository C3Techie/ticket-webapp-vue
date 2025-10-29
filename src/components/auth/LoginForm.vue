<!-- src/components/auth/LoginForm.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-text-primary">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-text-secondary">
          Or <router-link to="/auth/signup" class="text-accent hover:text-accent-light">create a new account</router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div class="space-y-2">
            <Input
              label="Email address"
              v-model="form.email"
              type="email"
              placeholder="demo@example.com"
              :error="errors.email"
            />
          </div>
          <div class="space-y-2">
            <Input
              label="Password"
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              :error="errors.password"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            :loading="isSubmitting"
            class="w-full"
          >
            Sign in
          </Button>
        </div>

        <div class="text-center">
          <p class="text-sm text-text-muted">
            Demo credentials: <strong>demo@example.com</strong> / <strong>password</strong>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useToast } from '../../composables/useToast'
import Input from '../ui/Input.vue'
import Button from '../ui/Button.vue'

const router = useRouter()
const { login } = useAuth()
const { success, error } = useToast()

const isSubmitting = ref(false)
const errors = reactive({
  email: '',
  password: '',
})

const form = reactive({
  email: '',
  password: '',
})


const validateForm = () => {
  let isValid = true;
  errors.email = '';
  errors.password = '';

  if (!form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  if (!form.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  return isValid;
};


const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const result = await login(form.email, form.password);
    if (result.success) {
      success('Welcome back!', 'You have been successfully logged in.');
      // Redirect to intended route if present, else dashboard
      const redirect = router.currentRoute.value.query.redirect as string | undefined;
      if (redirect) {
        router.replace(redirect);
      } else {
        router.push('/dashboard');
      }
    } else {
      error('Login Failed', result.error || 'Please check your credentials and try again.');
    }
  } catch (err) {
    error('Login Failed', 'An unexpected error occurred. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>