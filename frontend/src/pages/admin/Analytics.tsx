import React, { useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download
} from 'lucide-react';
import { useAdminStore } from '../../store';
import { formatPercentage } from '../../utils';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Analytics: React.FC = () => {
  const { funnelData, onboardingRecords, isLoading, fetchFunnelData, fetchOnboardingRecords } = useAdminStore();

  useEffect(() => {
    fetchFunnelData();
    fetchOnboardingRecords();
  }, [fetchFunnelData, fetchOnboardingRecords]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Calculate analytics
  const totalMerchants = onboardingRecords.length;
  const completedMerchants = onboardingRecords.filter(r => r.completionPercentage === 100).length;
  const avgCompletionTime = 14; // Mock data
  const conversionRate = totalMerchants > 0 ? (completedMerchants / totalMerchants) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track onboarding performance and metrics</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{formatPercentage(conversionRate)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+2.5%</span>
            <span className="text-gray-600 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Completion Time</p>
              <p className="text-2xl font-bold text-gray-900">{avgCompletionTime}d</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">-1.2d</span>
            <span className="text-gray-600 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Merchants</p>
              <p className="text-2xl font-bold text-gray-900">{totalMerchants}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+12</span>
            <span className="text-gray-600 ml-1">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedMerchants}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <PieChart className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+8</span>
            <span className="text-gray-600 ml-1">this month</span>
          </div>
        </div>
      </div>

      {/* Funnel Chart */}
      {funnelData && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Onboarding Funnel</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Total Merchants</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{funnelData.total}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Hardware Delivery Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatPercentage((funnelData.hardwareDeliveryScheduled / funnelData.total) * 100)}
                </span>
                <span className="text-sm font-bold text-gray-900">{funnelData.hardwareDeliveryScheduled}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Hardware Delivery Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatPercentage((funnelData.hardwareDeliveryCompleted / funnelData.total) * 100)}
                </span>
                <span className="text-sm font-bold text-gray-900">{funnelData.hardwareDeliveryCompleted}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Installation Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatPercentage((funnelData.hardwareInstallationScheduled / funnelData.total) * 100)}
                </span>
                <span className="text-sm font-bold text-gray-900">{funnelData.hardwareInstallationScheduled}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Installation Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatPercentage((funnelData.hardwareInstallationCompleted / funnelData.total) * 100)}
                </span>
                <span className="text-sm font-bold text-gray-900">{funnelData.hardwareInstallationCompleted}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Training Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatPercentage((funnelData.trainingScheduled / funnelData.total) * 100)}
                </span>
                <span className="text-sm font-bold text-gray-900">{funnelData.trainingScheduled}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-teal-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Training Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatPercentage((funnelData.trainingCompleted / funnelData.total) * 100)}
                </span>
                <span className="text-sm font-bold text-gray-900">{funnelData.trainingCompleted}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span className="text-sm font-bold text-gray-900">Fully Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatPercentage((funnelData.fullyCompleted / funnelData.total) * 100)}
                </span>
                <span className="text-sm font-bold text-storehub-primary">{funnelData.fullyCompleted}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance by Segment */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance by Segment</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Food & Beverage</p>
              <p className="text-sm text-gray-600">45 merchants</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">78% completion</p>
              <p className="text-xs text-gray-600">12.5d avg time</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Retail</p>
              <p className="text-sm text-gray-600">32 merchants</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">65% completion</p>
              <p className="text-xs text-gray-600">15.2d avg time</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Services</p>
              <p className="text-sm text-gray-600">23 merchants</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">82% completion</p>
              <p className="text-xs text-gray-600">11.8d avg time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
