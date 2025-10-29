<!-- src/components/auth/SignupForm.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-text-primary">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-text-secondary">
          Or <router-link to="/auth/login" class="text-accent hover:text-accent-light">sign in to your existing account</router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div class="space-y-2">
            <Input
              label="Full name"
              v-model="form.name"
              type="text"
              placeholder="Enter your full name"
              :error="errors.name"
            />
          </div>
          <div class="space-y-2">
            <Input
              label="Email address"
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              :error="errors.email"
            />
          </div>
          <div class="space-y-2">
            <Input
              label="Password"
              v-model="form.password"
              type="password"
              placeholder="Create a password (min 6 characters)"
              :error="errors.password"
            />
          </div>
          <div class="space-y-2">
            <Input
              label="Confirm password"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              :error="errors.confirmPassword"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            :loading="isSubmitting"
            class="w-full"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';
import Input from '../ui/Input.vue';
import Button from '../ui/Button.vue';

const router = useRouter();
const { signup } = useAuth();
const { success, error } = useToast();

const isSubmitting = ref(false);
const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});


const validateForm = () => {
  let isValid = true;
  errors.name = '';
  errors.email = '';
  errors.password = '';
  errors.confirmPassword = '';

  if (!form.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  } else if (form.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
    isValid = false;
  }

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

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
    isValid = false;
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  return isValid;
};


const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const result = await signup(form.name, form.email, form.password);
    if (result.success) {
      success('Welcome!', 'Your account has been created successfully.');
      router.push('/dashboard');
    } else {
      error('Signup Failed', 'There was an issue creating your account. Please try again.');
    }
  } catch (err) {
    error('Signup Failed', 'An unexpected error occurred. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>