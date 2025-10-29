import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { User, AuthSession } from '../types';
import { storage } from '../utils/storage';


// GLOBAL STATE (singleton)
const user = ref<User | null>(null);
const isLoading = ref(true);

// Initialize auth state - make this reactive
const initializeAuth = () => {
  try {
    const session = storage.get<AuthSession>('ticketapp_session');
    if (session && new Date(session.expires_at) > new Date()) {
      user.value = session.user;
    } else {
      // Clear invalid session
      storage.remove('ticketapp_session');
      user.value = null;
    }
  } catch (error) {
    console.error('Auth initialization error:', error);
    user.value = null;
  } finally {
    isLoading.value = false;
  }
};

// Initialize immediately (once per app load)
initializeAuth();

export function useAuth() {
  const router = useRouter();

  // Helper to get stored users
  const getStoredUsers = () => {
    return storage.get<Record<string, { password: string; user: User }>>('ticketapp_users') || {};
  };

  // Helper to save a user
  const saveUser = (email: string, password: string, user: User) => {
    const users = getStoredUsers();
    users[email] = { password, user };
    storage.set('ticketapp_users', users);
  };

  // Ensure demo account is always available
  const ensureDemoAccount = () => {
    const users = getStoredUsers();
    if (!users['demo@example.com']) {
      const demoUser: User = {
        id: 'demo-user-1',
        email: 'demo@example.com',
        name: 'Demo User'
      };
      saveUser('demo@example.com', 'password', demoUser);
    }
  };

  // Initialize demo account
  ensureDemoAccount();

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getStoredUsers();
      const storedUser = users[email];
      
      if (storedUser && storedUser.password === password) {
        const session: AuthSession = {
          token: 'demo-token',
          user: storedUser.user,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };
        
        // Save to storage and update reactive state
        storage.set('ticketapp_session', session);
        user.value = storedUser.user; // This triggers reactivity
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid credentials. Please check your email and password.' 
        };
      }
    } catch (err) {
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = getStoredUsers();
      if (users[email]) {
        return {
          success: false,
          error: 'An account with this email already exists.'
        };
      }
      
      const userData: User = { 
        id: Date.now().toString(), 
        email, 
        name 
      };
      
      // Save user credentials
      saveUser(email, password, userData);
      
      const session: AuthSession = {
        token: 'demo-token',
        user: userData,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      
      storage.set('ticketapp_session', session);
      user.value = userData; // Trigger reactivity
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Signup failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    storage.remove('ticketapp_session');
    user.value = null; // Trigger reactivity
    router.push('/'); // Redirect to landing page
  };

  // Add a method to force refresh auth state
  const refreshAuth = () => {
    initializeAuth();
  };

  const isAuthenticated = computed(() => !!user.value);

  return {
    user: computed(() => user.value), // Make it computed for better reactivity
    isLoading: computed(() => isLoading.value),
    login,
    signup,
    logout,
    isAuthenticated,
    refreshAuth,
  };
}