const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve mobile login page
app.get('/merchant/login', (req, res) => {
  const loginPagePath = path.join(__dirname, '..', 'merchant-login-mobile.html');
  
  // Check if file exists
  if (fs.existsSync(loginPagePath)) {
    res.sendFile(loginPagePath);
  } else {
    // Fallback: serve inline HTML if file doesn't exist
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>StoreHub - Merchant Login</title>
          <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;
              }
              .container { 
                  background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                  width: 100%; max-width: 400px; padding: 40px 30px; text-align: center;
              }
              .logo h1 { color: #333; font-size: 28px; font-weight: 700; margin-bottom: 8px; }
              .logo p { color: #666; font-size: 14px; margin-bottom: 30px; }
              .welcome-text h2 { color: #333; font-size: 24px; font-weight: 600; margin-bottom: 8px; }
              .welcome-text p { color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px; }
              .form-group { margin-bottom: 20px; text-align: left; }
              .form-group label { display: block; color: #333; font-weight: 500; margin-bottom: 8px; font-size: 14px; }
              .form-group input { 
                  width: 100%; padding: 16px; border: 2px solid #e1e5e9; border-radius: 12px; 
                  font-size: 16px; transition: border-color 0.3s ease; background: #f8f9fa;
              }
              .form-group input:focus { outline: none; border-color: #667eea; background: white; }
              .login-btn { 
                  width: 100%; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600;
                  cursor: pointer; transition: transform 0.2s ease; margin-bottom: 20px;
              }
              .login-btn:hover { transform: translateY(-2px); }
              .error-message { background: #fee; color: #c53030; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; display: none; }
              .success-message { background: #f0fff4; color: #38a169; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; display: none; }
              .help-text { color: #666; font-size: 14px; line-height: 1.5; margin-top: 20px; }
              .help-text a { color: #667eea; text-decoration: none; }
              @media (max-width: 480px) {
                  .container { padding: 30px 20px; margin: 10px; }
                  .logo h1 { font-size: 24px; }
                  .welcome-text h2 { font-size: 20px; }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">
                  <h1>StoreHub</h1>
                  <p>Merchant Onboarding</p>
              </div>
              <div class="welcome-text">
                  <h2>Welcome Back!</h2>
                  <p>Access your onboarding dashboard to continue your setup process.</p>
              </div>
              <div class="error-message" id="errorMessage"></div>
              <div class="success-message" id="successMessage"></div>
              <form class="login-form" id="loginForm">
                  <div class="form-group">
                      <label for="token">Access Token</label>
                      <input type="text" id="token" name="token" placeholder="Enter your access token" required>
                  </div>
                  <button type="submit" class="login-btn" id="loginBtn">Continue to Dashboard</button>
              </form>
              <div class="help-text">
                  <p>Need help? Contact our support team at <a href="mailto:support@storehub.com">support@storehub.com</a></p>
              </div>
          </div>
          <script>
              const urlParams = new URLSearchParams(window.location.search);
              const tokenFromUrl = urlParams.get('token');
              if (tokenFromUrl) {
                  document.getElementById('token').value = tokenFromUrl;
                  setTimeout(() => document.getElementById('loginForm').dispatchEvent(new Event('submit')), 1000);
              }
              document.getElementById('loginForm').addEventListener('submit', async function(e) {
                  e.preventDefault();
                  const token = document.getElementById('token').value.trim();
                  const loginBtn = document.getElementById('loginBtn');
                  const errorMessage = document.getElementById('errorMessage');
                  const successMessage = document.getElementById('successMessage');
                  if (!token) {
                      errorMessage.textContent = 'Please enter your access token';
                      errorMessage.style.display = 'block';
                      return;
                  }
                  loginBtn.disabled = true;
                  loginBtn.textContent = 'Verifying...';
                  errorMessage.style.display = 'none';
                  successMessage.style.display = 'none';
                  try {
                      const response = await fetch('/api/v1/merchant/auth', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ token })
                      });
                      const data = await response.json();
                      if (data.success) {
                          successMessage.textContent = 'Login successful! Redirecting to dashboard...';
                          successMessage.style.display = 'block';
                          localStorage.setItem('merchantToken', token);
                          localStorage.setItem('merchantData', JSON.stringify(data.data));
                          setTimeout(() => window.location.href = '/merchant/dashboard', 1500);
                      } else {
                          errorMessage.textContent = data.message || 'Invalid access token. Please check and try again.';
                          errorMessage.style.display = 'block';
                      }
                  } catch (error) {
                      console.error('Login error:', error);
                      errorMessage.textContent = 'Connection error. Please check your internet connection and try again.';
                      errorMessage.style.display = 'block';
                  } finally {
                      loginBtn.disabled = false;
                      loginBtn.textContent = 'Continue to Dashboard';
                  }
              });
          </script>
      </body>
      </html>
    `);
  }
});

// In-memory storage for demo
let merchants = new Map();
let onboardingRecords = new Map();

// Helper function to generate secure token
function generateSecureToken(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

// Helper function to generate merchant ID
function generateMerchantId() {
  return crypto.randomUUID();
}

// Mock merchant data
const mockMerchant = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  accountName: 'Demo Restaurant',
  email: 'demo@restaurant.com',
  phone: '+60123456789',
  picName: 'John Doe',
  segment: 'food_beverage',
  preferredLanguage: 'en',
  status: 'active',
  authToken: 'demo-token-123',
  authTokenExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  businessLocation: 'Kuala Lumpur',
  notes: 'Demo merchant account',
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockOnboardingRecord = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  merchantId: '123e4567-e89b-12d3-a456-426614174001',
  onboardingType: 'full_onboarding',
  hardwareDeliveryStatus: 'pending',
  hardwareInstallationStatus: 'pending',
  trainingStatus: 'pending',
  overallStatus: 'pending',
  progress: {
    hardwareDelivery: {
      status: 'pending',
      slaDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      notes: null
    },
    hardwareInstallation: {
      status: 'pending',
      slaDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      notes: null
    },
    training: {
      status: 'pending',
      slaDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      notes: null
    }
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

// Initialize with mock data
merchants.set(mockMerchant.id, mockMerchant);
onboardingRecords.set(mockOnboardingRecord.id, mockOnboardingRecord);

// Phase 1a: Pre-fill form endpoint
app.post('/api/v1/admin/prefill', (req, res) => {
  const { 
    accountName, 
    email, 
    phone, 
    picName, 
    segment, 
    onboardingType, 
    preferredLanguage, 
    businessLocation, 
    notes 
  } = req.body;

  // Check if merchant exists
  const existingMerchant = Array.from(merchants.values()).find(m => m.email === email);
  if (existingMerchant) {
    return res.status(400).json({
      success: false,
      message: 'Merchant with this email already exists'
    });
  }

  // Create new merchant
  const merchantId = generateMerchantId();
  const authToken = generateSecureToken(64);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const newMerchant = {
    id: merchantId,
    accountName,
    email,
    phone,
    picName,
    segment,
    preferredLanguage: preferredLanguage || 'en',
    status: 'active',
    authToken,
    authTokenExpiry: expiresAt,
    businessLocation,
    notes,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  merchants.set(merchantId, newMerchant);

  // Create onboarding record
  const onboardingId = generateMerchantId();
  const newOnboardingRecord = {
    id: onboardingId,
    merchantId,
    onboardingType,
    hardwareDeliveryStatus: 'pending',
    hardwareInstallationStatus: 'pending',
    trainingStatus: 'pending',
    overallStatus: 'pending',
    progress: {
      hardwareDelivery: {
        status: 'pending',
        slaDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notes: null
      },
      hardwareInstallation: {
        status: 'pending',
        slaDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        notes: null
      },
      training: {
        status: 'pending',
        slaDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        notes: null
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  onboardingRecords.set(onboardingId, newOnboardingRecord);

  // Generate login link - Updated for production URLs
  const baseUrl = process.env.FRONTEND_URL || 'https://merchantonboarding.onrender.com';
  const loginLink = `${baseUrl}/merchant/login?token=${authToken}`;

  res.json({
    success: true,
    message: 'Merchant created successfully',
    data: {
      loginLink,
      token: authToken,
      expiresAt,
      merchantId,
      onboardingId
    }
  });
});

// Phase 1a: Generate login link for existing merchant
app.get('/api/v1/admin/prefill/link/:merchantId', (req, res) => {
  const { merchantId } = req.params;
  const merchant = merchants.get(merchantId);

  if (!merchant) {
    return res.status(404).json({
      success: false,
      message: 'Merchant not found'
    });
  }

  // Generate new token
  const authToken = generateSecureToken(64);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  // Update merchant
  merchant.authToken = authToken;
  merchant.authTokenExpiry = expiresAt;
  merchant.updatedAt = new Date();

  merchants.set(merchantId, merchant);

  const onboardingRecord = Array.from(onboardingRecords.values()).find(r => r.merchantId === merchantId);
  const baseUrl = process.env.FRONTEND_URL || 'https://merchantonboarding.onrender.com';
  const loginLink = `${baseUrl}/merchant/login?token=${authToken}`;

  res.json({
    success: true,
    data: {
      loginLink,
      token: authToken,
      expiresAt,
      merchantId,
      onboardingId: onboardingRecord?.id || null
    }
  });
});

// Phase 1a: Verify merchant token
app.get('/api/v1/admin/prefill/verify/:token', (req, res) => {
  const { token } = req.params;
  const merchant = Array.from(merchants.values()).find(m => m.authToken === token);

  if (!merchant) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // Check expiry
  if (merchant.authTokenExpiry && merchant.authTokenExpiry < new Date()) {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  res.json({
    success: true,
    data: {
      valid: true,
      merchantId: merchant.id
    }
  });
});

// Enhanced merchant authentication endpoint
app.post('/api/v1/merchant/auth', (req, res) => {
  const { token } = req.body;
  const merchant = Array.from(merchants.values()).find(m => m.authToken === token);

  if (!merchant) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // Check expiry
  if (merchant.authTokenExpiry && merchant.authTokenExpiry < new Date()) {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  res.json({
    success: true,
    data: {
      userId: merchant.id,
      email: merchant.email,
      role: 'merchant',
      accountName: merchant.accountName,
      segment: merchant.segment
    }
  });
});

// Existing endpoints (updated to work with new data structure)
app.get('/api/v1/auth/me', (req, res) => {
  res.json({
    success: true,
    data: {
      userId: mockMerchant.id,
      email: mockMerchant.email,
      role: 'merchant',
      accountName: mockMerchant.accountName,
      segment: mockMerchant.segment
    }
  });
});

app.get('/api/v1/merchant/onboarding', (req, res) => {
  const { token } = req.query;
  
  if (token) {
    const merchant = Array.from(merchants.values()).find(m => m.authToken === token);
    if (merchant) {
      const onboardingRecord = Array.from(onboardingRecords.values()).find(r => r.merchantId === merchant.id);
      return res.json({
        success: true,
        data: {
          id: onboardingRecord?.id,
          merchant: merchant,
          progress: onboardingRecord?.progress
        }
      });
    }
  }
  
  // Default response
  res.json({
    success: true,
    data: {
      id: mockOnboardingRecord.id,
      merchant: mockMerchant,
      progress: mockOnboardingRecord.progress
    }
  });
});

app.get('/api/v1/merchant/progress', (req, res) => {
  const completedSteps = 0;
  const totalSteps = 3;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  res.json({
    success: true,
    data: {
      completedSteps,
      totalSteps,
      completionPercentage,
      currentStep: 'hardware_delivery',
      nextSteps: ['Schedule hardware delivery']
    }
  });
});

app.get('/api/v1/merchant/delivery-dates', (req, res) => {
  const dates = [];
  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  res.json({ success: true, data: dates });
});

app.post('/api/v1/merchant/schedule', (req, res) => {
  const { type, date } = req.body;
  res.json({
    success: true,
    message: `${type} scheduled successfully for ${date}`,
    data: mockOnboardingRecord
  });
});

app.get('/api/v1/admin/onboarding', (req, res) => {
  const allRecords = Array.from(onboardingRecords.values()).map(record => ({
    ...record,
    merchant: merchants.get(record.merchantId)
  }));
  
  res.json({
    success: true,
    data: allRecords
  });
});

app.get('/api/v1/reports/onboarding-funnel', (req, res) => {
  res.json({
    success: true,
    data: {
      total: merchants.size,
      hardwareDeliveryScheduled: Math.floor(merchants.size * 0.85),
      hardwareDeliveryCompleted: Math.floor(merchants.size * 0.70),
      hardwareInstallationScheduled: Math.floor(merchants.size * 0.60),
      hardwareInstallationCompleted: Math.floor(merchants.size * 0.50),
      trainingScheduled: Math.floor(merchants.size * 0.40),
      trainingCompleted: Math.floor(merchants.size * 0.30),
      fullyOnboarded: Math.floor(merchants.size * 0.25)
    }
  });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.send(`
    <html>
      <head><title>StoreHub Onboarding API - Phase 1a Demo</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
        <h1>🚀 StoreHub Onboarding API - Phase 1a Demo</h1>
        <p><strong>Server Status:</strong> ✅ Running on port ${PORT}</p>
        
        <h2>📋 Phase 1a New Endpoints</h2>
        <ul>
          <li><strong>POST /api/v1/admin/prefill</strong> - Create merchant from pre-fill form</li>
          <li><strong>GET /api/v1/admin/prefill/link/:merchantId</strong> - Generate login link</li>
          <li><strong>GET /api/v1/admin/prefill/verify/:token</strong> - Verify merchant token</li>
          <li><strong>POST /api/v1/merchant/auth</strong> - Authenticate merchant with token</li>
        </ul>
        
        <h2>🔍 Test Pre-fill Form</h2>
        <p>Use this sample data to test the pre-fill endpoint:</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">
{
  "accountName": "Test Restaurant",
  "email": "test@restaurant.com",
  "phone": "+60123456789",
  "picName": "Jane Doe",
  "segment": "food_beverage",
  "onboardingType": "full_onboarding",
  "preferredLanguage": "en",
  "businessLocation": "Kuala Lumpur",
  "notes": "Test merchant"
}
        </pre>
        
        <h2>📊 Demo Data</h2>
        <p>Current merchants: ${merchants.size}</p>
        <p>Current onboarding records: ${onboardingRecords.size}</p>
        
        <h2>🔗 Demo Links</h2>
        <p><a href="/api/v1/admin/onboarding">View all onboarding records</a></p>
        <p><a href="/api/v1/reports/onboarding-funnel">View onboarding funnel</a></p>
      </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 StoreHub Onboarding API - Phase 1a Demo Server Started

📍 Server: http://localhost:${PORT}
📚 API Docs: http://localhost:${PORT}/api/docs
🔄 Status: Ready for Phase 1a testing

✅ Phase 1a Features:
- Pre-fill form workflow
- Merchant login link generation  
- Token-based authentication
- Onboarding record creation

💾 Demo Data: ${merchants.size} merchants, ${onboardingRecords.size} onboarding records
  `);
});
