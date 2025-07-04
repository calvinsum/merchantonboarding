import axios, { type AxiosResponse } from 'axios';
import { 
  type ApiResponse, 
  type OnboardingRecord, 
  type SchedulingRequest, 
  type OnboardingFunnelData,
  type AdminUser 
} from '../types';

const API_BASE_URL = 'http://localhost:3001/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Methods
export const apiService = {
  // Authentication
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },

  async getCurrentUser(): Promise<AdminUser> {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  // Merchant APIs
  async getMerchantProgress(): Promise<OnboardingRecord> {
    const response = await api.get('/merchant/progress');
    return response.data.data;
  },

  async getMerchantOnboarding(): Promise<OnboardingRecord> {
    const response = await api.get('/merchant/onboarding');
    return response.data.data;
  },

  async getAvailableDeliveryDates(): Promise<string[]> {
    const response = await api.get('/merchant/delivery-dates');
    return response.data.data;
  },

  async scheduleAppointment(request: SchedulingRequest): Promise<OnboardingRecord> {
    const response = await api.post('/merchant/schedule', request);
    return response.data.data;
  },

  // Admin APIs
  async getOnboardingRecords(): Promise<OnboardingRecord[]> {
    const response = await api.get('/admin/onboarding');
    return response.data.data;
  },

  async getSLABreaches(): Promise<any[]> {
    const response = await api.get('/admin/sla-breaches');
    return response.data.data;
  },

  async updateOnboardingStatus(recordId: string, step: string, status: string): Promise<OnboardingRecord> {
    const response = await api.put(`/admin/onboarding/${recordId}`, { step, status });
    return response.data.data;
  },

  async addMerchantTag(merchantId: string, tag: string): Promise<void> {
    await api.post(`/admin/merchants/${merchantId}/tags`, { tag });
  },

  // Reports APIs
  async getOnboardingFunnel(): Promise<OnboardingFunnelData> {
    const response = await api.get('/reports/onboarding-funnel');
    return response.data.data;
  },

  async getCompletionRates(): Promise<any> {
    const response = await api.get('/reports/completion-rates');
    return response.data.data;
  },

  async getSLAPerformance(): Promise<any> {
    const response = await api.get('/reports/sla-performance');
    return response.data.data;
  },

  // Utility methods
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await api.get('/health');
    return response.data;
  },
};

// Helper function to handle API responses
export const handleApiResponse = <T>(
  response: AxiosResponse<ApiResponse<T>>
): T => {
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.error || 'API request failed');
  }
};

// Export the axios instance for direct use if needed
export default api;
