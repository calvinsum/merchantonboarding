import React, { useState } from 'react';
import { 
  Save, 
  Bell, 
  Calendar, 
 
 

  Globe,
  Clock
} from 'lucide-react';
import { useUIStore } from '../../store';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Settings: React.FC = () => {
  const { addToast } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // SLA Settings
    hardwareDeliverySLA: 7,
    hardwareInstallationSLA: 5,
    trainingSLA: 3,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    slaBreachAlerts: true,
    
    // Working Hours
    workingHoursStart: '09:00',
    workingHoursEnd: '17:00',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    
    // Delivery Settings
    maxDeliveriesPerDay: 10,
    deliverySlotDuration: 2,
    
    // Training Settings
    maxTrainingsPerDay: 6,
    trainingSlotDuration: 2,
    roundRobinTrainers: true,
    
    // System Settings
    autoAssignTrainers: true,
    requireApprovalForRescheduling: false,
    sendReminderNotifications: true,
    reminderDaysBefore: 1,
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast({
        type: 'success',
        title: 'Settings Saved',
        message: 'Your settings have been updated successfully.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: 'Failed to save settings. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWorkingDayToggle = (day: string) => {
    setSettings(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="btn-primary flex items-center space-x-2"
        >
          {isLoading ? (
            <LoadingSpinner size="small" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SLA Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">SLA Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hardware Delivery SLA (days)
              </label>
              <input
                type="number"
                value={settings.hardwareDeliverySLA}
                onChange={(e) => handleInputChange('hardwareDeliverySLA', parseInt(e.target.value))}
                className="input w-full"
                min="1"
                max="30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hardware Installation SLA (days)
              </label>
              <input
                type="number"
                value={settings.hardwareInstallationSLA}
                onChange={(e) => handleInputChange('hardwareInstallationSLA', parseInt(e.target.value))}
                className="input w-full"
                min="1"
                max="30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training SLA (days)
              </label>
              <input
                type="number"
                value={settings.trainingSLA}
                onChange={(e) => handleInputChange('trainingSLA', parseInt(e.target.value))}
                className="input w-full"
                min="1"
                max="30"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                <p className="text-xs text-gray-500">Send email notifications for updates</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="w-4 h-4 text-storehub-primary rounded focus:ring-storehub-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                <p className="text-xs text-gray-500">Send SMS notifications for updates</p>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                className="w-4 h-4 text-storehub-primary rounded focus:ring-storehub-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">SLA Breach Alerts</p>
                <p className="text-xs text-gray-500">Alert when SLA is breached</p>
              </div>
              <input
                type="checkbox"
                checked={settings.slaBreachAlerts}
                onChange={(e) => handleInputChange('slaBreachAlerts', e.target.checked)}
                className="w-4 h-4 text-storehub-primary rounded focus:ring-storehub-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Reminder Notifications</p>
                <p className="text-xs text-gray-500">Send reminders before appointments</p>
              </div>
              <input
                type="checkbox"
                checked={settings.sendReminderNotifications}
                onChange={(e) => handleInputChange('sendReminderNotifications', e.target.checked)}
                className="w-4 h-4 text-storehub-primary rounded focus:ring-storehub-500"
              />
            </div>
            
            {settings.sendReminderNotifications && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Days Before
                </label>
                <input
                  type="number"
                  value={settings.reminderDaysBefore}
                  onChange={(e) => handleInputChange('reminderDaysBefore', parseInt(e.target.value))}
                  className="input w-full"
                  min="1"
                  max="7"
                />
              </div>
            )}
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={settings.workingHoursStart}
                  onChange={(e) => handleInputChange('workingHoursStart', e.target.value)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={settings.workingHoursEnd}
                  onChange={(e) => handleInputChange('workingHoursEnd', e.target.value)}
                  className="input w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Days
              </label>
              <div className="flex flex-wrap gap-2">
                {days.map(day => (
                  <button
                    key={day.key}
                    onClick={() => handleWorkingDayToggle(day.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      settings.workingDays.includes(day.key)
                        ? 'bg-storehub-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Delivery & Training Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Deliveries Per Day
              </label>
              <input
                type="number"
                value={settings.maxDeliveriesPerDay}
                onChange={(e) => handleInputChange('maxDeliveriesPerDay', parseInt(e.target.value))}
                className="input w-full"
                min="1"
                max="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Slot Duration (hours)
              </label>
              <input
                type="number"
                value={settings.deliverySlotDuration}
                onChange={(e) => handleInputChange('deliverySlotDuration', parseInt(e.target.value))}
                className="input w-full"
                min="1"
                max="8"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Trainings Per Day
              </label>
              <input
                type="number"
                value={settings.maxTrainingsPerDay}
                onChange={(e) => handleInputChange('maxTrainingsPerDay', parseInt(e.target.value))}
                className="input w-full"
                min="1"
                max="20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Slot Duration (hours)
              </label>
              <input
                type="number"
                value={settings.trainingSlotDuration}
                onChange={(e) => handleInputChange('trainingSlotDuration', parseInt(e.target.value))}
                className="input w-full"
                min="1"
                max="8"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Round Robin Trainers</p>
                <p className="text-xs text-gray-500">Automatically assign trainers in rotation</p>
              </div>
              <input
                type="checkbox"
                checked={settings.roundRobinTrainers}
                onChange={(e) => handleInputChange('roundRobinTrainers', e.target.checked)}
                className="w-4 h-4 text-storehub-primary rounded focus:ring-storehub-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Auto Assign Trainers</p>
                <p className="text-xs text-gray-500">Automatically assign available trainers</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoAssignTrainers}
                onChange={(e) => handleInputChange('autoAssignTrainers', e.target.checked)}
                className="w-4 h-4 text-storehub-primary rounded focus:ring-storehub-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
