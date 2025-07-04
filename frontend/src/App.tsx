import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store';
import { useUIStore } from './store';

// Layout Components
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';

// Public Pages
import LoginPage from './pages/LoginPage';
import MerchantPortal from './pages/merchant/MerchantPortal';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import OnboardingRecords from './pages/admin/OnboardingRecords';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

// UI Components
import ToastContainer from './components/ui/ToastContainer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { checkAuth, isLoading } = useAuthStore();
  const { toasts } = useUIStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          } />
          
          <Route path="/merchant" element={
            <PublicLayout>
              <MerchantPortal />
            </PublicLayout>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/onboarding" element={
            <ProtectedRoute>
              <Layout>
                <OnboardingRecords />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/analytics" element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Default Redirects */}
          <Route path="/" element={<Navigate to="/merchant" replace />} />
          <Route path="*" element={<Navigate to="/merchant" replace />} />
        </Routes>

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} />
      </div>
    </BrowserRouter>
  );
};

export default App;
