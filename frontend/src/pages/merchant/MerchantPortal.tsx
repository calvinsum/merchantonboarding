import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Truck, 
  Wrench, 
  GraduationCap,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useMerchantStore, useUIStore } from '../../store';
import { formatDate, getStatusColor, calculateProgress } from '../../utils';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const MerchantPortal: React.FC = () => {
  const { onboardingRecord, availableDates, isLoading, fetchProgress, fetchAvailableDates, scheduleAppointment } = useMerchantStore();
  const { addToast } = useUIStore();
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    fetchProgress();
    fetchAvailableDates();
  }, [fetchProgress, fetchAvailableDates]);

  const handleSchedule = async () => {
    if (!selectedStep || !selectedDate) return;

    setIsScheduling(true);
    try {
      await scheduleAppointment(selectedStep, selectedDate, notes);
      addToast({
        type: 'success',
        title: 'Appointment Scheduled',
        message: `Your ${selectedStep.replace('_', ' ')} appointment has been scheduled successfully.`,
      });
      setSelectedStep(null);
      setSelectedDate('');
      setNotes('');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Scheduling Failed',
        message: 'Unable to schedule appointment. Please try again.',
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'hardwareDelivery':
        return Truck;
      case 'hardwareInstallation':
        return Wrench;
      case 'training':
        return GraduationCap;
      default:
        return Clock;
    }
  };

  const getStepTitle = (step: string) => {
    switch (step) {
      case 'hardwareDelivery':
        return 'Hardware Delivery';
      case 'hardwareInstallation':
        return 'Hardware Installation';
      case 'training':
        return 'Training Session';
      default:
        return step;
    }
  };

  const getStepDescription = (step: string) => {
    switch (step) {
      case 'hardwareDelivery':
        return 'POS hardware and accessories will be delivered to your location';
      case 'hardwareInstallation':
        return 'Our technician will install and configure your POS system';
      case 'training':
        return 'Comprehensive training on using your new POS system';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!onboardingRecord) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Onboarding Record Found</h2>
        <p className="text-gray-600">Please contact support if you believe this is an error.</p>
      </div>
    );
  }

  const progress = calculateProgress(onboardingRecord.progress);
  const steps = ['hardwareDelivery', 'hardwareInstallation', 'training'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {onboardingRecord.merchant.accountName}!
            </h1>
            <p className="text-gray-600 mt-1">
              Track your onboarding progress and schedule appointments
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-storehub-primary">{progress}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progress}% Complete</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{onboardingRecord.merchant.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{onboardingRecord.merchant.phone}</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Segment</p>
              <p className="font-medium capitalize">{onboardingRecord.merchant.segment.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Onboarding Steps</h2>
        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const stepData = onboardingRecord.progress[step as keyof typeof onboardingRecord.progress];
            const Icon = getStepIcon(step);
            const isCompleted = stepData.status === 'completed';
            const isOverdue = stepData.status === 'overdue';
            const canSchedule = stepData.status === 'pending';

            return (
              <div key={step} className="flex items-start space-x-4">
                <div className={`stepper-step ${isCompleted ? 'completed' : isOverdue ? 'overdue' : canSchedule ? 'active' : 'pending'}`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{getStepTitle(step)}</h3>
                      <p className="text-sm text-gray-600">{getStepDescription(step)}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(stepData.status)}`}>
                        {stepData.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Due:</span> {formatDate(stepData.slaDate)}
                    </div>
                    
                    {canSchedule && (
                      <button
                        onClick={() => setSelectedStep(step)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Schedule
                      </button>
                    )}
                  </div>
                  
                  {stepData.notes && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">{stepData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      {onboardingRecord.nextSteps && onboardingRecord.nextSteps.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">Next Steps</h3>
          <ul className="space-y-1">
            {onboardingRecord.nextSteps.map((step, index) => (
              <li key={index} className="text-sm text-blue-800">• {step}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Scheduling Modal */}
      {selectedStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Schedule {getStepTitle(selectedStep)}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input w-full"
                >
                  <option value="">Choose a date</option>
                  {availableDates.map(date => (
                    <option key={date} value={date}>
                      {formatDate(date)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input w-full h-20 resize-none"
                  placeholder="Any special requirements or notes..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedStep(null)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                disabled={!selectedDate || isScheduling}
                className="btn-primary"
              >
                {isScheduling ? <LoadingSpinner size="small" /> : 'Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantPortal;
