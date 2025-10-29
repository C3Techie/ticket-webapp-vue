import { ref } from 'vue';
import type { Toast } from '../types';


// GLOBAL SINGLETON TOAST STATE
const toasts = ref<Toast[]>([]);

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: Toast = { ...toast, id, duration: toast.duration || 5000 };
  toasts.value = [...toasts.value, newToast];
  if (newToast.duration !== Infinity) {
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  }
};

const removeToast = (id: string) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id);
};

const success = (title: string, message?: string) => {
  addToast({ type: 'success', title, message });
};

const error = (title: string, message?: string) => {
  addToast({ type: 'error', title, message });
};

const warning = (title: string, message?: string) => {
  addToast({ type: 'warning', title, message });
};

const info = (title: string, message?: string) => {
  addToast({ type: 'info', title, message });
};

export function useToast() {
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}