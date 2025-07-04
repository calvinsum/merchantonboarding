import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  type OnboardingRecord, 
  type AdminUser, 
  type Toast, 
  type OnboardingFunnelData,
  type SLABreach 
} from '../types';
import { apiService } from '../services/api';

// Auth Store
interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { token, user } = await apiService.login(email, password);
          localStorage.setItem('token', token);
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
          const user = await apiService.getCurrentUser();
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('Auth check failed:', error);
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Merchant Store
interface MerchantState {
  onboardingRecord: OnboardingRecord | null;
  availableDates: string[];
  isLoading: boolean;
  fetchProgress: () => Promise<void>;
  fetchAvailableDates: () => Promise<void>;
  scheduleAppointment: (type: string, date: string, notes?: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useMerchantStore = create<MerchantState>((set, get) => ({
  onboardingRecord: null,
  availableDates: [],
  isLoading: false,

  fetchProgress: async () => {
    set({ isLoading: true });
    try {
      const record = await apiService.getMerchantProgress();
      set({ onboardingRecord: record });
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAvailableDates: async () => {
    try {
      const dates = await apiService.getAvailableDeliveryDates();
      set({ availableDates: dates });
    } catch (error) {
      console.error('Failed to fetch available dates:', error);
      throw error;
    }
  },

  scheduleAppointment: async (type: string, date: string, notes?: string) => {
    set({ isLoading: true });
    try {
      const record = await apiService.scheduleAppointment({ 
        type: type as any, 
        date, 
        notes 
      });
      set({ onboardingRecord: record });
    } catch (error) {
      console.error('Failed to schedule appointment:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshData: async () => {
    await Promise.all([
      get().fetchProgress(),
      get().fetchAvailableDates(),
    ]);
  },
}));

// Admin Store
interface AdminState {
  onboardingRecords: OnboardingRecord[];
  slaBreaches: SLABreach[];
  funnelData: OnboardingFunnelData | null;
  isLoading: boolean;
  fetchOnboardingRecords: () => Promise<void>;
  fetchSLABreaches: () => Promise<void>;
  fetchFunnelData: () => Promise<void>;
  updateOnboardingStatus: (recordId: string, step: string, status: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  onboardingRecords: [],
  slaBreaches: [],
  funnelData: null,
  isLoading: false,

  fetchOnboardingRecords: async () => {
    set({ isLoading: true });
    try {
      const records = await apiService.getOnboardingRecords();
      set({ onboardingRecords: records });
    } catch (error) {
      console.error('Failed to fetch onboarding records:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSLABreaches: async () => {
    try {
      const breaches = await apiService.getSLABreaches();
      set({ slaBreaches: breaches });
    } catch (error) {
      console.error('Failed to fetch SLA breaches:', error);
      throw error;
    }
  },

  fetchFunnelData: async () => {
    try {
      const data = await apiService.getOnboardingFunnel();
      set({ funnelData: data });
    } catch (error) {
      console.error('Failed to fetch funnel data:', error);
      throw error;
    }
  },

  updateOnboardingStatus: async (recordId: string, step: string, status: string) => {
    set({ isLoading: true });
    try {
      await apiService.updateOnboardingStatus(recordId, step, status);
      await get().fetchOnboardingRecords();
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshData: async () => {
    await Promise.all([
      get().fetchOnboardingRecords(),
      get().fetchSLABreaches(),
      get().fetchFunnelData(),
    ]);
  },
}));

// UI Store
interface UIState {
  toasts: Toast[];
  sidebarOpen: boolean;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  sidebarOpen: false,

  addToast: (toast) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    // Auto-remove toast after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, toast.duration || 5000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },
}));
