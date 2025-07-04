export interface Merchant {
  id: string;
  accountName: string;
  email: string;
  phone: string;
  picName: string;
  segment: MerchantSegment;
  deliveryAddress: Address;
  trainingAddress: Address;
  preferredLanguage: Language;
  expectedGoLiveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingRecord {
  id: string;
  merchantId: string;
  merchant?: Merchant;
  types: OnboardingType[];
  status: OnboardingStatus;
  slaBreaches: SLABreach[];
  progress: OnboardingProgress;
  notes: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingProgress {
  hardwareDelivery: ProgressStep;
  hardwareInstallation: ProgressStep;
  training: ProgressStep;
}

export interface ProgressStep {
  status: ProgressStepStatus;
  scheduledDate?: Date;
  completedDate?: Date;
  slaDate: Date;
  notes?: string;
}

export interface DeliveryLocation {
  id: string;
  name: string;
  region: string;
  minWorkingDays: number;
  maxWorkingDays: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingType {
  id: string;
  name: string;
  mode: TrainingMode;
  duration: number; // in minutes
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  languages: Language[];
  locations: string[];
  status: TrainerStatus;
  assignmentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  trainerId: string;
  trainer?: Trainer;
  trainingTypeId: string;
  trainingType?: TrainingType;
  mode: TrainingMode;
  maxParticipants: number;
  bookedParticipants: number;
  isBooked: boolean;
  onboardingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SLABreach {
  id: string;
  onboardingId: string;
  type: OnboardingType;
  expectedDate: Date;
  actualDate?: Date;
  breachDays: number;
  reason?: string;
  isResolved: boolean;
  resolvedAt?: Date;
  createdAt: Date;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  isRecurring: boolean;
  region?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  channel: NotificationChannel;
  subject: string;
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemSettings {
  id: string;
  key: string;
  value: string;
  type: SettingType;
  description: string;
  category: string;
  isEditable: boolean;
  updatedAt: Date;
}

export interface AuthToken {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  merchantId: string;
  role: UserRole;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleRequest {
  onboardingId: string;
  type: OnboardingType;
  date: Date;
  slotId?: string; // for training
  notes?: string;
}

export interface RescheduleRequest {
  onboardingId: string;
  type: OnboardingType;
  newDate: Date;
  newSlotId?: string;
  reason: string;
}

export interface Analytics {
  onboardingFunnel: FunnelData;
  slaPerformance: SLAPerformance;
  completionRates: CompletionRate[];
  trainerUtilization: TrainerUtilization[];
  segmentPerformance: SegmentPerformance[];
}

export interface FunnelData {
  total: number;
  hardwareDeliveryScheduled: number;
  hardwareDeliveryCompleted: number;
  hardwareInstallationScheduled: number;
  hardwareInstallationCompleted: number;
  trainingScheduled: number;
  trainingCompleted: number;
  fullyCompleted: number;
}

export interface SLAPerformance {
  totalRecords: number;
  onTime: number;
  breached: number;
  breachRate: number;
  averageCompletionDays: number;
}

export interface CompletionRate {
  period: string;
  rate: number;
  count: number;
}

export interface TrainerUtilization {
  trainerId: string;
  trainerName: string;
  totalSlots: number;
  bookedSlots: number;
  utilizationRate: number;
}

export interface SegmentPerformance {
  segment: MerchantSegment;
  totalRecords: number;
  completedRecords: number;
  completionRate: number;
  averageCompletionDays: number;
}

// Enums
export enum OnboardingType {
  HARDWARE_DELIVERY = 'hardware_delivery',
  HARDWARE_INSTALLATION = 'hardware_installation',
  TRAINING = 'training',
}

export enum OnboardingStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ProgressStepStatus {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TrainingMode {
  PHYSICAL = 'physical',
  REMOTE = 'remote',
  VIDEO = 'video',
}

export enum TrainerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BUSY = 'busy',
}

export enum Language {
  ENGLISH = 'en',
  MALAY = 'ms',
  MANDARIN = 'zh',
  TAMIL = 'ta',
}

export enum MerchantSegment {
  FOOD_BEVERAGE = 'food_beverage',
  RETAIL = 'retail',
  SERVICES = 'services',
  HEALTHCARE = 'healthcare',
  BEAUTY = 'beauty',
  EDUCATION = 'education',
  OTHER = 'other',
}

export enum NotificationType {
  REMINDER = 'reminder',
  CONFIRMATION = 'confirmation',
  SLA_BREACH = 'sla_breach',
  RESCHEDULE = 'reschedule',
  COMPLETION = 'completion',
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  BOTH = 'both',
}

export enum SettingType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  JSON = 'json',
}

export enum UserRole {
  MERCHANT = 'merchant',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filter Types
export interface OnboardingFilter {
  status?: OnboardingStatus;
  segment?: MerchantSegment;
  assignedTo?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  slaStatus?: 'on_time' | 'breached' | 'at_risk';
}

export interface AnalyticsFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  segment?: MerchantSegment;
  region?: string;
  trainer?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalOnboarding: number;
  pendingOnboarding: number;
  completedOnboarding: number;
  slaBreaches: number;
  activeTrainers: number;
  upcomingTraining: number;
}

export interface RecentActivity {
  id: string;
  type: 'schedule' | 'complete' | 'reschedule' | 'sla_breach';
  description: string;
  timestamp: Date;
  userId: string;
  onboardingId: string;
}

// Form Types
export interface OnboardingFormData {
  merchantAccountName: string;
  picName: string;
  email: string;
  phone: string;
  deliveryAddress: Address;
  trainingAddress: Address;
  preferredLanguage: Language;
  expectedGoLiveDate: Date;
  segment: MerchantSegment;
  onboardingTypes: OnboardingType[];
}

export interface TrainerFormData {
  name: string;
  email: string;
  phone: string;
  languages: Language[];
  locations: string[];
  status: TrainerStatus;
}

export interface TrainingSlotFormData {
  date: Date;
  startTime: string;
  endTime: string;
  trainerId: string;
  trainingTypeId: string;
  mode: TrainingMode;
  maxParticipants: number;
}
