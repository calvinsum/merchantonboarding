import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AdminDashboardController {
  @Get()
  async serveAdminDashboard(@Res() res: Response) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>StoreHub - Onboarding Manager</title>
          <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  min-height: 100vh; color: #333;
              }
              .header {
                  background: rgba(255, 255, 255, 0.95);
                  backdrop-filter: blur(10px);
                  padding: 20px 0;
                  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
              }
              .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
              .header-content { display: flex; justify-content: space-between; align-items: center; }
              .logo h1 { color: #333; font-size: 32px; font-weight: 700; }
              .logo p { color: #666; font-size: 16px; margin-top: 5px; }
              .auth-section { display: flex; gap: 15px; align-items: center; }
              .btn {
                  padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;
                  transition: all 0.3s ease; border: none; cursor: pointer; font-size: 14px;
              }
              .btn-primary { background: #667eea; color: white; }
              .btn-primary:hover { background: #5a6fd8; transform: translateY(-2px); }
              .btn-secondary { background: transparent; color: #667eea; border: 2px solid #667eea; }
              .btn-secondary:hover { background: #667eea; color: white; }
              .main-content { padding: 60px 0; }
              .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
              .dashboard-card {
                  background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
                  border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                  transition: transform 0.3s ease;
              }
              .dashboard-card:hover { transform: translateY(-5px); }
              .card-icon { font-size: 48px; margin-bottom: 20px; }
              .card-title { font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #333; }
              .card-description { color: #666; line-height: 1.6; margin-bottom: 20px; }
              .hero { text-align: center; color: white; margin-bottom: 40px; }
              .hero h2 { font-size: 48px; font-weight: 700; margin-bottom: 20px; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
              .hero p { font-size: 20px; opacity: 0.9; max-width: 600px; margin: 0 auto; }
              .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 40px 0; }
              .stat-card {
                  background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);
                  border-radius: 12px; padding: 20px; text-align: center; color: white;
              }
              .stat-number { font-size: 36px; font-weight: 700; margin-bottom: 5px; }
              .stat-label { opacity: 0.8; font-size: 14px; }
              @media (max-width: 768px) {
                  .header-content { flex-direction: column; gap: 20px; }
                  .hero h2 { font-size: 36px; }
                  .dashboard-grid { grid-template-columns: 1fr; }
              }
          </style>
      </head>
      <body>
          <div class="header">
              <div class="container">
                  <div class="header-content">
                      <div class="logo">
                          <h1>StoreHub</h1>
                          <p>Merchant Onboarding Manager</p>
                      </div>
                      <div class="auth-section">
                          <a href="/auth/google" class="btn btn-primary" target="_self">Sign in with Google</a>
                          <a href="/api/docs" class="btn btn-secondary">API Docs</a>
                      </div>
                  </div>
              </div>
          </div>

          <div class="main-content">
              <div class="container">
                  <div class="hero">
                      <h2>Welcome to StoreHub Onboarding</h2>
                      <p>Streamline merchant onboarding with automated workflows, tracking, and mobile-friendly experiences.</p>
                  </div>

                  <div class="stats-grid">
                      <div class="stat-card">
                          <div class="stat-number" id="totalMerchants">0</div>
                          <div class="stat-label">Total Merchants</div>
                      </div>
                      <div class="stat-card">
                          <div class="stat-number" id="activeOnboarding">0</div>
                          <div class="stat-label">Active Onboarding</div>
                      </div>
                      <div class="stat-card">
                          <div class="stat-number" id="completedToday">0</div>
                          <div class="stat-label">Completed Today</div>
                      </div>
                      <div class="stat-card">
                          <div class="stat-number" id="avgTime">0</div>
                          <div class="stat-label">Avg. Days to Complete</div>
                      </div>
                  </div>

                  <div class="dashboard-grid">
                      <div class="dashboard-card">
                          <div class="card-icon">👥</div>
                          <div class="card-title">Merchant Management</div>
                          <div class="card-description">
                              Create new merchants, generate login links, and manage onboarding records.
                              Perfect for StoreHub staff to initiate the onboarding process.
                          </div>
                          <a href="/api/v1/admin/prefill" class="btn btn-primary">Manage Merchants</a>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">📱</div>
                          <div class="card-title">Mobile Experience</div>
                          <div class="card-description">
                              Merchants receive mobile-optimized login links with beautiful, touch-friendly interfaces
                              similar to popular delivery apps.
                          </div>
                          <a href="/api/v1/merchant/login?token=demo" class="btn btn-secondary">Preview Mobile Login</a>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">🔐</div>
                          <div class="card-title">Secure Authentication</div>
                          <div class="card-description">
                              Google OAuth integration for StoreHub staff (@storehub.com emails) with JWT tokens
                              for secure merchant access.
                          </div>
                          <a href="/auth/google" class="btn btn-primary" target="_self">Sign In</a>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">📊</div>
                          <div class="card-title">API & Integration</div>
                          <div class="card-description">
                              RESTful API with comprehensive documentation, perfect for integrating with existing
                              StoreHub systems and workflows.
                          </div>
                          <a href="/api/docs" class="btn btn-secondary">View API Docs</a>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">⚡</div>
                          <div class="card-title">Quick Actions</div>
                          <div class="card-description">
                              Common tasks for onboarding managers: create merchants, generate links, track progress.
                          </div>
                          <div style="margin-top: 20px;">
                              <button onclick="createMerchant()" class="btn btn-primary" style="margin-right: 10px;">Create Merchant</button>
                              <button onclick="viewReports()" class="btn btn-secondary">View Reports</button>
                          </div>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">🎯</div>
                          <div class="card-title">Phase 1A Features</div>
                          <div class="card-description">
                              Currently live: Pre-fill forms, merchant login generation, token authentication, 
                              and onboarding record creation.
                          </div>
                          <div style="margin-top: 20px;">
                              <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">LIVE</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <script>
              // Simulate loading stats
              function loadStats() {
                  document.getElementById('totalMerchants').textContent = '1';
                  document.getElementById('activeOnboarding').textContent = '1';
                  document.getElementById('completedToday').textContent = '0';
                  document.getElementById('avgTime').textContent = '7';
              }

              function createMerchant() {
                  const merchantName = prompt('Enter merchant name:');
                  const email = prompt('Enter merchant email:');
                  
                  if (merchantName && email) {
                      alert('Merchant creation would be handled through the API. See API docs for implementation details.');
                      // In real implementation, this would call the API
                  }
              }

              function viewReports() {
                  alert('Reports feature coming in Phase 1B. Currently showing basic stats above.');
              }

              // Load stats on page load
              window.addEventListener('load', loadStats);

              // Handle Google OAuth redirect
              function handleAuthRedirect() {
                  const urlParams = new URLSearchParams(window.location.search);
                  const token = urlParams.get('token');
                  const auth = urlParams.get('auth');
                  
                  if (token && auth === 'success') {
                      // Store token in localStorage
                      localStorage.setItem('adminToken', token);
                      
                      // Show success message
                      const successDiv = document.createElement('div');
                      successDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; background: #10b981; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-weight: 600;';
                      successDiv.textContent = '✅ Successfully signed in with Google!';
                      document.body.appendChild(successDiv);
                      
                      // Remove success message after 5 seconds
                      setTimeout(() => {
                          successDiv.remove();
                      }, 5000);
                      
                      // Clean up URL
                      window.history.replaceState({}, document.title, window.location.pathname);
                      
                      // Update UI to show signed in state
                      const signInBtn = document.querySelector('a[href="/auth/google"]');
                      if (signInBtn) {
                          signInBtn.textContent = '✅ Signed In';
                          signInBtn.style.background = '#10b981';
                          signInBtn.href = '#';
                      }
                  }
              }

              // Check for auth redirect on page load
              window.addEventListener('load', handleAuthRedirect);

              // Handle Google OAuth button clicks
              function handleGoogleLogin() {
                  const googleButtons = document.querySelectorAll('a[href="/auth/google"]');
                  googleButtons.forEach(button => {
                      button.addEventListener('click', function(e) {
                          console.log('Google OAuth button clicked');
                          // Let the default behavior proceed (navigate to /auth/google)
                      });
                  });
              }

              // Initialize Google OAuth button handlers
              window.addEventListener('load', handleGoogleLogin);
          </script>
      </body>
      </html>
    `);
  }

  @Get('admin')
  async redirectToRoot(@Res() res: Response) {
    res.redirect('/');
  }
} 