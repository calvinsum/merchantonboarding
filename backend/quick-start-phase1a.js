const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

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

  // Generate login link
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const loginLink = `${baseUrl}/merchant/onboarding?token=${authToken}`;

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
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const loginLink = `${baseUrl}/merchant/onboarding?token=${authToken}`;

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
