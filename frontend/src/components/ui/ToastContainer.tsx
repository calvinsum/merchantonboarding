import React from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { type Toast } from '../../types';
import { useUIStore } from '../../store';
import { cn } from '../../utils';

interface ToastContainerProps {
  toasts: Toast[];
}

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { removeToast } = useUIStore();

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={cn(
        'flex items-start p-4 rounded-lg border shadow-sm transition-all duration-300',
        colors[toast.type]
      )}
    >
      <Icon className={cn('w-5 h-5 mr-3 mt-0.5', iconColors[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{toast.title}</p>
        <p className="text-sm opacity-90 mt-1">{toast.message}</p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
