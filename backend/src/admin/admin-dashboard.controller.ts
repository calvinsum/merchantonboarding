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
          <title>StoreHub - Merchant Onboarding Manager</title>
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
                  display: inline-block; text-align: center;
              }
              .btn-primary { background: #667eea; color: white; }
              .btn-primary:hover { background: #5a6fd8; transform: translateY(-2px); }
              .btn-secondary { background: transparent; color: #667eea; border: 2px solid #667eea; }
              .btn-secondary:hover { background: #667eea; color: white; }
              .btn-success { background: #10b981; color: white; }
              .btn-success:hover { background: #059669; transform: translateY(-2px); }
              .btn-info { background: #3b82f6; color: white; }
              .btn-info:hover { background: #2563eb; transform: translateY(-2px); }
              .main-content { padding: 40px 0; }
              .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-top: 30px; }
              .dashboard-card {
                  background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
                  border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                  transition: transform 0.3s ease;
              }
              .dashboard-card:hover { transform: translateY(-5px); }
              .card-icon { font-size: 48px; margin-bottom: 20px; }
              .card-title { font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #333; }
              .card-description { color: #666; line-height: 1.6; margin-bottom: 25px; }
              .hero { text-align: center; color: white; margin-bottom: 30px; }
              .hero h2 { font-size: 42px; font-weight: 700; margin-bottom: 15px; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
              .hero p { font-size: 18px; opacity: 0.9; max-width: 600px; margin: 0 auto; }
              .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
              .stat-card {
                  background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);
                  border-radius: 12px; padding: 20px; text-align: center; color: white;
              }
              .stat-number { font-size: 36px; font-weight: 700; margin-bottom: 5px; }
              .stat-label { opacity: 0.8; font-size: 14px; }
              .form-container {
                  background: rgba(255, 255, 255, 0.98);
                  border-radius: 12px;
                  padding: 25px;
                  margin-top: 20px;
                  display: none;
              }
              .form-group { margin-bottom: 20px; }
              .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #333; }
              .form-group input, .form-group select, .form-group textarea {
                  width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;
                  font-size: 14px; transition: border-color 0.3s ease;
              }
              .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                  outline: none; border-color: #667eea;
              }
              .btn-group { display: flex; gap: 10px; flex-wrap: wrap; }
              .alert { padding: 15px; border-radius: 8px; margin: 15px 0; }
              .alert-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
              .alert-error { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
              .merchant-link-result {
                  background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px;
                  padding: 20px; margin-top: 15px; display: none;
              }
              .copy-button {
                  background: #0ea5e9; color: white; border: none; padding: 8px 16px;
                  border-radius: 6px; cursor: pointer; margin-left: 10px;
              }
              @media (max-width: 768px) {
                  .header-content { flex-direction: column; gap: 20px; }
                  .hero h2 { font-size: 32px; }
                  .dashboard-grid { grid-template-columns: 1fr; }
                  .btn-group { flex-direction: column; }
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
                          <a href="/auth/google" class="btn btn-primary" target="_self" id="authButton">Sign in with Google</a>
                          <a href="/api/docs" class="btn btn-secondary">API Docs</a>
                      </div>
                  </div>
              </div>
          </div>

          <div class="main-content">
              <div class="container">
                  <div class="hero">
                      <h2>Merchant Onboarding Manager</h2>
                      <p>Create merchants, generate login links, and manage onboarding workflows efficiently.</p>
                  </div>

                  <div class="stats-grid">
                      <div class="stat-card">
                          <div class="stat-number" id="totalMerchants">1</div>
                          <div class="stat-label">Total Merchants</div>
                      </div>
                      <div class="stat-card">
                          <div class="stat-number" id="activeOnboarding">1</div>
                          <div class="stat-label">Active Onboarding</div>
                      </div>
                      <div class="stat-card">
                          <div class="stat-number" id="completedToday">0</div>
                          <div class="stat-label">Completed Today</div>
                      </div>
                      <div class="stat-card">
                          <div class="stat-number" id="avgTime">7</div>
                          <div class="stat-label">Avg. Days to Complete</div>
                      </div>
                  </div>

                  <div class="dashboard-grid">
                      <div class="dashboard-card">
                          <div class="card-icon">🏪</div>
                          <div class="card-title">Create New Merchant</div>
                          <div class="card-description">
                              Create a new merchant from pre-fill form data and automatically generate their mobile login link.
                          </div>
                          <div class="btn-group">
                              <button onclick="showCreateMerchantForm()" class="btn btn-success">Create Merchant</button>
                              <button onclick="testAPI()" class="btn btn-info">Test API</button>
                          </div>
                          
                          <div id="createMerchantForm" class="form-container">
                              <h3 style="margin-bottom: 20px; color: #333;">New Merchant Details</h3>
                              <div class="form-group">
                                  <label for="businessName">Business Name *</label>
                                  <input type="text" id="businessName" placeholder="e.g., Joe's Restaurant" required>
                              </div>
                              <div class="form-group">
                                  <label for="ownerName">Owner Name *</label>
                                  <input type="text" id="ownerName" placeholder="e.g., Joe Smith" required>
                              </div>
                              <div class="form-group">
                                  <label for="email">Email Address *</label>
                                  <input type="email" id="email" placeholder="e.g., joe@joesrestaurant.com" required>
                              </div>
                              <div class="form-group">
                                  <label for="phone">Phone Number *</label>
                                  <input type="tel" id="phone" placeholder="e.g., +60123456789" required>
                              </div>
                              <div class="form-group">
                                  <label for="businessType">Business Type</label>
                                  <select id="businessType">
                                      <option value="restaurant">Restaurant</option>
                                      <option value="cafe">Cafe</option>
                                      <option value="retail">Retail Store</option>
                                      <option value="grocery">Grocery Store</option>
                                      <option value="other">Other</option>
                                  </select>
                              </div>
                              <div class="btn-group">
                                  <button onclick="createMerchant()" class="btn btn-success">Create & Generate Link</button>
                                  <button onclick="hideCreateMerchantForm()" class="btn btn-secondary">Cancel</button>
                              </div>
                              <div id="merchantResult" class="merchant-link-result">
                                  <h4 style="color: #0369a1; margin-bottom: 10px;">✅ Merchant Created Successfully!</h4>
                                  <p><strong>Merchant ID:</strong> <span id="resultMerchantId"></span></p>
                                  <p><strong>Login Link:</strong></p>
                                  <div style="display: flex; align-items: center; margin-top: 10px;">
                                      <input type="text" id="resultLoginLink" readonly style="flex: 1; background: #f8fafc;">
                                      <button onclick="copyToClipboard('resultLoginLink')" class="copy-button">Copy</button>
                                  </div>
                                  <p style="margin-top: 15px; color: #374151; font-size: 14px;">
                                      📱 Send this link to the merchant to start their onboarding process on mobile.
                                  </p>
                              </div>
                          </div>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">🔗</div>
                          <div class="card-title">Generate Login Link</div>
                          <div class="card-description">
                              Generate a new login link for an existing merchant using their Merchant ID.
                          </div>
                          <div class="btn-group">
                              <button onclick="showGenerateLinkForm()" class="btn btn-primary">Generate Link</button>
                              <a href="/admin/prefill" class="btn btn-secondary" target="_blank">View API</a>
                          </div>
                          
                          <div id="generateLinkForm" class="form-container">
                              <h3 style="margin-bottom: 20px; color: #333;">Generate Login Link</h3>
                              <div class="form-group">
                                  <label for="merchantId">Merchant ID *</label>
                                  <input type="text" id="merchantId" placeholder="e.g., merchant_123" required>
                              </div>
                              <div class="btn-group">
                                  <button onclick="generateLink()" class="btn btn-primary">Generate Link</button>
                                  <button onclick="hideGenerateLinkForm()" class="btn btn-secondary">Cancel</button>
                              </div>
                              <div id="linkResult" class="merchant-link-result">
                                  <h4 style="color: #0369a1; margin-bottom: 10px;">🔗 Login Link Generated!</h4>
                                  <div style="display: flex; align-items: center; margin-top: 10px;">
                                      <input type="text" id="resultGeneratedLink" readonly style="flex: 1; background: #f8fafc;">
                                      <button onclick="copyToClipboard('resultGeneratedLink')" class="copy-button">Copy</button>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">📱</div>
                          <div class="card-title">Mobile Preview</div>
                          <div class="card-description">
                              Preview how the merchant login experience looks on mobile devices.
                          </div>
                          <div class="btn-group">
                              <a href="/api/v1/merchant/login?token=demo" class="btn btn-info" target="_blank">Preview Mobile</a>
                              <button onclick="showMobileInfo()" class="btn btn-secondary">Learn More</button>
                          </div>
                      </div>

                      <div class="dashboard-card">
                          <div class="card-icon">📊</div>
                          <div class="card-title">Documentation & API</div>
                          <div class="card-description">
                              Access comprehensive API documentation and integration guides for developers.
                          </div>
                          <div class="btn-group">
                              <a href="/api/docs" class="btn btn-primary" target="_blank">API Documentation</a>
                              <button onclick="showIntegrationInfo()" class="btn btn-secondary">Integration Guide</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <script>
              let authToken = localStorage.getItem('adminToken');

              // Handle Google OAuth redirect
              function handleAuthRedirect() {
                  const urlParams = new URLSearchParams(window.location.search);
                  const token = urlParams.get('token');
                  const auth = urlParams.get('auth');
                  
                  if (token && auth === 'success') {
                      localStorage.setItem('adminToken', token);
                      authToken = token;
                      
                      showAlert('✅ Successfully signed in with Google!', 'success');
                      
                      // Update UI
                      const authButton = document.getElementById('authButton');
                      authButton.textContent = '✅ Signed In';
                      authButton.style.background = '#10b981';
                      authButton.href = '#';
                      
                      // Clean up URL
                      window.history.replaceState({}, document.title, window.location.pathname);
                  }
              }

              function showAlert(message, type) {
                  const alert = document.createElement('div');
                  alert.className = \`alert alert-\${type}\`;
                  alert.textContent = message;
                  alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; max-width: 400px;';
                  document.body.appendChild(alert);
                  
                  setTimeout(() => alert.remove(), 5000);
              }

              function showCreateMerchantForm() {
                  document.getElementById('createMerchantForm').style.display = 'block';
                  hideOtherForms('createMerchantForm');
              }

              function hideCreateMerchantForm() {
                  document.getElementById('createMerchantForm').style.display = 'none';
                  document.getElementById('merchantResult').style.display = 'none';
              }

              function showGenerateLinkForm() {
                  document.getElementById('generateLinkForm').style.display = 'block';
                  hideOtherForms('generateLinkForm');
              }

              function hideGenerateLinkForm() {
                  document.getElementById('generateLinkForm').style.display = 'none';
                  document.getElementById('linkResult').style.display = 'none';
              }

              function hideOtherForms(except) {
                  const forms = ['createMerchantForm', 'generateLinkForm'];
                  forms.forEach(formId => {
                      if (formId !== except) {
                          document.getElementById(formId).style.display = 'none';
                      }
                  });
              }

              async function createMerchant() {
                  if (!authToken) {
                      showAlert('Please sign in with Google first', 'error');
                      return;
                  }

                  const merchantData = {
                      businessName: document.getElementById('businessName').value,
                      ownerName: document.getElementById('ownerName').value,
                      email: document.getElementById('email').value,
                      phone: document.getElementById('phone').value,
                      businessType: document.getElementById('businessType').value
                  };

                  if (!merchantData.businessName || !merchantData.ownerName || !merchantData.email || !merchantData.phone) {
                      showAlert('Please fill in all required fields', 'error');
                      return;
                  }

                  try {
                      const response = await fetch('/admin/prefill', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': \`Bearer \${authToken}\`
                          },
                          body: JSON.stringify(merchantData)
                      });

                      const result = await response.json();

                      if (response.ok) {
                          document.getElementById('resultMerchantId').textContent = result.merchantId;
                          document.getElementById('resultLoginLink').value = result.loginLink;
                          document.getElementById('merchantResult').style.display = 'block';
                          showAlert('Merchant created successfully!', 'success');
                          
                          // Clear form
                          document.getElementById('businessName').value = '';
                          document.getElementById('ownerName').value = '';
                          document.getElementById('email').value = '';
                          document.getElementById('phone').value = '';
                      } else {
                          showAlert(\`Error: \${result.message}\`, 'error');
                      }
                  } catch (error) {
                      showAlert('Network error. Please try again.', 'error');
                  }
              }

              async function generateLink() {
                  if (!authToken) {
                      showAlert('Please sign in with Google first', 'error');
                      return;
                  }

                  const merchantId = document.getElementById('merchantId').value;
                  if (!merchantId) {
                      showAlert('Please enter a Merchant ID', 'error');
                      return;
                  }

                  try {
                      const response = await fetch(\`/admin/prefill/link/\${merchantId}\`, {
                          headers: {
                              'Authorization': \`Bearer \${authToken}\`
                          }
                      });

                      const result = await response.json();

                      if (response.ok) {
                          document.getElementById('resultGeneratedLink').value = result.loginLink;
                          document.getElementById('linkResult').style.display = 'block';
                          showAlert('Login link generated successfully!', 'success');
                      } else {
                          showAlert(\`Error: \${result.message}\`, 'error');
                      }
                  } catch (error) {
                      showAlert('Network error. Please try again.', 'error');
                  }
              }

              async function testAPI() {
                  try {
                      const response = await fetch('/admin/prefill');
                      const result = await response.json();
                      
                      if (response.status === 401) {
                          showAlert('API is working! (Authentication required)', 'success');
                      } else {
                          showAlert(\`API Response: \${JSON.stringify(result)}\`, 'success');
                      }
                  } catch (error) {
                      showAlert('API test failed', 'error');
                  }
              }

              function copyToClipboard(elementId) {
                  const element = document.getElementById(elementId);
                  element.select();
                  document.execCommand('copy');
                  showAlert('Copied to clipboard!', 'success');
              }

              function showMobileInfo() {
                  showAlert('Mobile experience features beautiful UI similar to delivery apps with touch-friendly design', 'success');
              }

              function showIntegrationInfo() {
                  showAlert('Visit /api/docs for complete API documentation and integration examples', 'success');
              }

              // Initialize
              window.addEventListener('load', () => {
                  handleAuthRedirect();
                  
                  // Check if already signed in
                  if (authToken) {
                      const authButton = document.getElementById('authButton');
                      authButton.textContent = '✅ Signed In';
                      authButton.style.background = '#10b981';
                      authButton.href = '#';
                  }
              });
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