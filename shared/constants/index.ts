// StoreHub Brand Colors
export const STOREHUB_COLORS = {
  primary: '#1A73E8',
  secondary: '#34A853',
  accent: '#FBBC04',
  danger: '#EA4335',
  warning: '#FF9800',
  success: '#4CAF50',
  info: '#2196F3',
  dark: '#212121',
  light: '#F5F5F5',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
} as const;

// SLA Configuration
export const SLA_CONFIG = {
  HARDWARE_DELIVERY: {
    DEFAULT_DAYS: 7,
    REMINDER_DAYS: 3,
    ESCALATION_DAYS: 1,
  },
  HARDWARE_INSTALLATION: {
    DEFAULT_DAYS: 3,
    REMINDER_DAYS: 1,
    ESCALATION_DAYS: 1,
    MIN_DAYS_AFTER_DELIVERY: 1,
  },
  TRAINING: {
    DEFAULT_DAYS: 5,
    REMINDER_DAYS: 2,
    ESCALATION_DAYS: 1,
    MIN_DAYS_AFTER_INSTALLATION: 1,
  },
} as const;

// Token Configuration
export const TOKEN_CONFIG = {
  MERCHANT_TOKEN_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  REFRESH_TOKEN_EXPIRY: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
  ADMIN_TOKEN_EXPIRY: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
} as const;

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  EMAIL_TEMPLATES: {
    WELCOME: 'welcome',
    REMINDER: 'reminder',
    CONFIRMATION: 'confirmation',
    SLA_BREACH: 'sla_breach',
    RESCHEDULE: 'reschedule',
    COMPLETION: 'completion',
  },
  SMS_TEMPLATES: {
    REMINDER: 'sms_reminder',
    CONFIRMATION: 'sms_confirmation',
    RESCHEDULE: 'sms_reschedule',
  },
  REMINDER_INTERVALS: {
    FIRST_REMINDER: 24 * 60 * 60 * 1000, // 24 hours
    SECOND_REMINDER: 12 * 60 * 60 * 1000, // 12 hours
    FINAL_REMINDER: 3 * 60 * 60 * 1000, // 3 hours
  },
} as const;

// Business Hours
export const BUSINESS_HOURS = {
  START: '09:00',
  END: '18:00',
  TIMEZONE: 'Asia/Kuala_Lumpur',
  WORKING_DAYS: [1, 2, 3, 4, 5], // Monday to Friday
} as const;

// Training Configuration
export const TRAINING_CONFIG = {
  SLOT_DURATION: 60, // minutes
  MAX_PARTICIPANTS_PER_SLOT: 5,
  ADVANCE_BOOKING_DAYS: 2,
  CANCELLATION_HOURS: 24,
  ROUND_ROBIN_RESET_HOURS: 24,
} as const;

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
} as const;

// File Upload Configuration
export const FILE_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
  MAX_FILES: 5,
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Malaysia States
export const MALAYSIA_STATES = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Kuala Lumpur',
  'Labuan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Perak',
  'Perlis',
  'Pulau Pinang',
  'Putrajaya',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
] as const;

// Language Options
export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ms', label: 'Bahasa Malaysia' },
  { value: 'zh', label: '中文' },
  { value: 'ta', label: 'தமிழ்' },
] as const;

// Merchant Segment Options
export const MERCHANT_SEGMENT_OPTIONS = [
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail' },
  { value: 'services', label: 'Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
] as const;

// Training Mode Options
export const TRAINING_MODE_OPTIONS = [
  { value: 'physical', label: 'Physical' },
  { value: 'remote', label: 'Remote' },
  { value: 'video', label: 'Video' },
] as const;

// Status Options
export const STATUS_OPTIONS = {
  ONBOARDING: [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ],
  PROGRESS_STEP: [
    { value: 'pending', label: 'Pending' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ],
  TRAINER: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'busy', label: 'Busy' },
  ],
} as const;

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  POSTAL_CODE: /^\d{5}$/,
  TIME: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  DISPLAY_WITH_TIME: 'DD MMM YYYY, HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  TIME_ONLY: 'HH:mm',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_DATE: 'Please select a valid date',
  INVALID_TIME: 'Please select a valid time',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NETWORK_ERROR: 'Network error. Please try again.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  INVALID_TOKEN: 'Invalid token. Please log in again.',
  SCHEDULING_CONFLICT: 'The selected time slot is no longer available',
  INVALID_SCHEDULE_DATE: 'Please select a valid date within the allowed range',
  MINIMUM_ADVANCE_BOOKING: 'Booking must be made at least 24 hours in advance',
  WEEKEND_NOT_ALLOWED: 'Weekend appointments are not available',
  HOLIDAY_NOT_ALLOWED: 'Appointments cannot be scheduled on holidays',
  INSTALLATION_BEFORE_DELIVERY: 'Installation must be scheduled after delivery',
  TRAINING_BEFORE_INSTALLATION: 'Training must be scheduled after installation',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SCHEDULE_SUCCESS: 'Appointment scheduled successfully',
  RESCHEDULE_SUCCESS: 'Appointment rescheduled successfully',
  CANCEL_SUCCESS: 'Appointment cancelled successfully',
  SAVE_SUCCESS: 'Changes saved successfully',
  CREATE_SUCCESS: 'Record created successfully',
  UPDATE_SUCCESS: 'Record updated successfully',
  DELETE_SUCCESS: 'Record deleted successfully',
  EMAIL_SENT: 'Email sent successfully',
  SMS_SENT: 'SMS sent successfully',
} as const;

// System Settings Keys
export const SYSTEM_SETTINGS_KEYS = {
  DEFAULT_SLA_DAYS: 'default_sla_days',
  REMINDER_DAYS: 'reminder_days',
  ESCALATION_DAYS: 'escalation_days',
  BUSINESS_HOURS_START: 'business_hours_start',
  BUSINESS_HOURS_END: 'business_hours_end',
  TIMEZONE: 'timezone',
  EMAIL_ENABLED: 'email_enabled',
  SMS_ENABLED: 'sms_enabled',
  AUTO_ASSIGN_TRAINERS: 'auto_assign_trainers',
  HOLIDAY_API_URL: 'holiday_api_url',
  SENDGRID_API_KEY: 'sendgrid_api_key',
  TWILIO_API_KEY: 'twilio_api_key',
  TWILIO_PHONE_NUMBER: 'twilio_phone_number',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
  },
  MERCHANT: {
    ONBOARDING: '/merchant/onboarding',
    SCHEDULE: '/merchant/schedule',
    RESCHEDULE: '/merchant/reschedule',
    CANCEL: '/merchant/cancel',
    PROGRESS: '/merchant/progress',
    AVAILABLE_SLOTS: '/merchant/slots',
  },
  ADMIN: {
    ONBOARDING: '/admin/onboarding',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
    USERS: '/admin/users',
    TRAINERS: '/admin/trainers',
    TRAINING_TYPES: '/admin/training-types',
    TRAINING_SLOTS: '/admin/training-slots',
    DELIVERY_LOCATIONS: '/admin/delivery-locations',
    HOLIDAYS: '/admin/holidays',
    NOTIFICATIONS: '/admin/notifications',
  },
  REPORTS: {
    ONBOARDING_FUNNEL: '/reports/onboarding-funnel',
    SLA_PERFORMANCE: '/reports/sla-performance',
    TRAINER_UTILIZATION: '/reports/trainer-utilization',
    SEGMENT_PERFORMANCE: '/reports/segment-performance',
    EXPORT: '/reports/export',
  },
} as const;

// Chart Colors
export const CHART_COLORS = [
  '#1A73E8',
  '#34A853',
  '#FBBC04',
  '#EA4335',
  '#FF9800',
  '#4CAF50',
  '#2196F3',
  '#9C27B0',
  '#00BCD4',
  '#FF5722',
] as const;

// Export all constants
export * from './api-endpoints';
export * from './validation-schemas';
