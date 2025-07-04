// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Merchant Types
export interface Merchant {
  id: string;
  accountName: string;
  email: string;
  phone: string;
  picName: string;
  segment: string;
  preferredLanguage: string;
  createdAt?: string;
  updatedAt?: string;
}

// Progress Types
export interface ProgressStatus {
  status: 'pending' | 'scheduled' | 'completed' | 'overdue';
  slaDate: string;
  notes?: string;
  scheduledDate?: string;
  completedDate?: string;
}

export interface OnboardingProgress {
  hardwareDelivery: ProgressStatus;
  hardwareInstallation: ProgressStatus;
  training: ProgressStatus;
}

export interface OnboardingRecord {
  id: string;
  merchant: Merchant;
  progress: OnboardingProgress;
  completionPercentage: number;
  nextSteps: string[];
  createdAt: string;
  updatedAt: string;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  name: string;
}

export interface SLABreach {
  id: string;
  merchantId: string;
  merchantName: string;
  step: string;
  breachDate: string;
  daysOverdue: number;
  severity: 'low' | 'medium' | 'high';
}

// Scheduling Types
export interface SchedulingRequest {
  type: 'hardware_delivery' | 'hardware_installation' | 'training';
  date: string;
  notes?: string;
}

export interface AvailableSlot {
  date: string;
  time: string;
  available: boolean;
}

// Analytics Types
export interface OnboardingFunnelData {
  total: number;
  hardwareDeliveryScheduled: number;
  hardwareDeliveryCompleted: number;
  hardwareInstallationScheduled: number;
  hardwareInstallationCompleted: number;
  trainingScheduled: number;
  trainingCompleted: number;
  fullyCompleted: number;
}

// UI Types
export interface StepperStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  icon?: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SchedulingForm {
  type: 'hardware_delivery' | 'hardware_installation' | 'training';
  date: string;
  time: string;
  notes?: string;
}

// Route Types
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  protected?: boolean;
  roles?: string[];
}
