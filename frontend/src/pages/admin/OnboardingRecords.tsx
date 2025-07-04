import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 

  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useAdminStore } from '../../store';
import { formatDate, getStatusBadgeColor, formatPercentage } from '../../utils';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const OnboardingRecords: React.FC = () => {
  const { onboardingRecords, isLoading, fetchOnboardingRecords } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOnboardingRecords();
  }, [fetchOnboardingRecords]);


  const filteredRecords = onboardingRecords.filter(record => {
    const matchesSearch = record.merchant.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'completed' && record.completionPercentage === 100) ||
                         (statusFilter === 'in_progress' && record.completionPercentage > 0 && record.completionPercentage < 100) ||
                         (statusFilter === 'not_started' && record.completionPercentage === 0);
    
    return matchesSearch && matchesStatus;
  });

  const getProgressIcon = (percentage: number) => {
    if (percentage === 100) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (percentage > 0) return <Clock className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  const getStepStatus = (step: any) => {
    const isOverdue = new Date(step.slaDate) < new Date() && step.status !== 'completed';
    if (isOverdue) return 'overdue';
    return step.status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Onboarding Records</h1>
        <p className="text-gray-600">Manage merchant onboarding progress and statuses</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-auto min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="not_started">Not Started</option>
              </select>
            </div>
            
            <span className="text-sm text-gray-500">
              {filteredRecords.length} of {onboardingRecords.length} records
            </span>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hardware Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Installation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-storehub-100 flex items-center justify-center">
                          <span className="text-storehub-600 font-medium text-sm">
                            {record.merchant.accountName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.merchant.accountName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.merchant.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getProgressIcon(record.completionPercentage)}
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPercentage(record.completionPercentage)}
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-storehub-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${record.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(getStepStatus(record.progress.hardwareDelivery))}`}>
                        {getStepStatus(record.progress.hardwareDelivery)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {formatDate(record.progress.hardwareDelivery.slaDate)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(getStepStatus(record.progress.hardwareInstallation))}`}>
                        {getStepStatus(record.progress.hardwareInstallation)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {formatDate(record.progress.hardwareInstallation.slaDate)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(getStepStatus(record.progress.training))}`}>
                        {getStepStatus(record.progress.training)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {formatDate(record.progress.training.slaDate)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(record.updatedAt)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-storehub-600 hover:text-storehub-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {searchTerm || statusFilter !== 'all' ? 
                'No records match your search criteria.' : 
                'No onboarding records found.'
              }
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {onboardingRecords.filter(r => r.completionPercentage === 100).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {onboardingRecords.filter(r => r.completionPercentage > 0 && r.completionPercentage < 100).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {onboardingRecords.filter(r => r.completionPercentage === 0).length}
            </div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-storehub-primary">
              {formatPercentage(onboardingRecords.length > 0 ? 
                (onboardingRecords.filter(r => r.completionPercentage === 100).length / onboardingRecords.length) * 100 : 0
              )}
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingRecords;
