import React, { useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react';
import { useAdminStore } from '../../store';
import { formatDate, formatPercentage } from '../../utils';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminDashboard: React.FC = () => {
  const { 
    onboardingRecords, 
    slaBreaches, 
    funnelData, 
    isLoading, 
    fetchOnboardingRecords, 
    fetchSLABreaches, 
    fetchFunnelData 
  } = useAdminStore();

  useEffect(() => {
    fetchOnboardingRecords();
    fetchSLABreaches();
    fetchFunnelData();
  }, [fetchOnboardingRecords, fetchSLABreaches, fetchFunnelData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Calculate stats
  const totalMerchants = onboardingRecords.length;
  const completedOnboarding = onboardingRecords.filter(record => record.completionPercentage === 100).length;
  const inProgress = onboardingRecords.filter(record => record.completionPercentage > 0 && record.completionPercentage < 100).length;
  const completionRate = totalMerchants > 0 ? (completedOnboarding / totalMerchants) * 100 : 0;

  const recentActivity = onboardingRecords
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Monitor onboarding progress and performance metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Merchants</p>
              <p className="text-2xl font-bold text-gray-900">{totalMerchants}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedOnboarding}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">SLA Breaches</p>
              <p className="text-2xl font-bold text-gray-900">{slaBreaches.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rate */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Completion Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-storehub-primary mb-2">
              {formatPercentage(completionRate)}
            </div>
            <p className="text-gray-600">of merchants have completed onboarding</p>
          </div>
        </div>

        {/* Onboarding Funnel */}
        {funnelData && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Onboarding Funnel</h3>
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Hardware Delivery</span>
                <span className="font-medium">{funnelData.hardwareDeliveryCompleted}/{funnelData.hardwareDeliveryScheduled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Hardware Installation</span>
                <span className="font-medium">{funnelData.hardwareInstallationCompleted}/{funnelData.hardwareInstallationScheduled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Training</span>
                <span className="font-medium">{funnelData.trainingCompleted}/{funnelData.trainingScheduled}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-3">
                <span className="text-sm font-medium text-gray-900">Fully Completed</span>
                <span className="font-bold text-storehub-primary">{funnelData.fullyCompleted}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity and SLA Breaches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{record.merchant.accountName}</p>
                  <p className="text-sm text-gray-600">{record.completionPercentage}% complete</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{formatDate(record.updatedAt)}</p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>

        {/* SLA Breaches */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">SLA Breaches</h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-3">
            {slaBreaches.slice(0, 5).map((breach) => (
              <div key={breach.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{breach.merchantName}</p>
                  <p className="text-sm text-red-600">{breach.step.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">{breach.daysOverdue}d overdue</p>
                  <p className="text-xs text-gray-500">{formatDate(breach.breachDate)}</p>
                </div>
              </div>
            ))}
            {slaBreaches.length === 0 && (
              <div className="text-center py-4">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-gray-500">No SLA breaches</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary p-4 text-left">
            <Users className="w-6 h-6 mb-2" />
            <div>
              <p className="font-medium">View All Merchants</p>
              <p className="text-sm opacity-75">Manage onboarding records</p>
            </div>
          </button>
          
          <button className="btn-secondary p-4 text-left">
            <BarChart3 className="w-6 h-6 mb-2" />
            <div>
              <p className="font-medium">Analytics</p>
              <p className="text-sm opacity-75">View detailed reports</p>
            </div>
          </button>
          
          <button className="btn-outline p-4 text-left">
            <Calendar className="w-6 h-6 mb-2" />
            <div>
              <p className="font-medium">Schedule Management</p>
              <p className="text-sm opacity-75">Manage appointments</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
