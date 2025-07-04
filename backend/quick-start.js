const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockOnboardingData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  merchant: {
    id: '123e4567-e89b-12d3-a456-426614174001',
    accountName: 'Demo Restaurant',
    email: 'demo@restaurant.com',
    phone: '+60123456789',
    picName: 'John Doe',
    segment: 'food_beverage',
    preferredLanguage: 'en'
  },
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
  }
};

// Routes
app.get('/api/v1/auth/me', (req, res) => {
  res.json({
    success: true,
    data: {
      userId: '123e4567-e89b-12d3-a456-426614174001',
      email: 'demo@restaurant.com',
      role: 'merchant'
    }
  });
});

app.get('/api/v1/merchant/onboarding', (req, res) => {
  res.json({
    success: true,
    data: mockOnboardingData
  });
});

app.get('/api/v1/merchant/progress', (req, res) => {
  const completedSteps = 0;
  const totalSteps = 3;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  res.json({
    success: true,
    data: {
      merchant: mockOnboardingData.merchant,
      progress: mockOnboardingData.progress,
      completionPercentage,
      nextSteps: ['Schedule hardware delivery']
    }
  });
});

app.get('/api/v1/merchant/delivery-dates', (req, res) => {
  const dates = [];
  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
      dates.push(date.toISOString());
    }
  }
  res.json({ success: true, data: dates });
});

app.post('/api/v1/merchant/schedule', (req, res) => {
  const { type, date } = req.body;
  res.json({
    success: true,
    message: `${type} scheduled successfully for ${date}`,
    data: mockOnboardingData
  });
});

app.get('/api/v1/admin/onboarding', (req, res) => {
  res.json({
    success: true,
    data: [mockOnboardingData]
  });
});

app.get('/api/v1/reports/onboarding-funnel', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 100,
      hardwareDeliveryScheduled: 85,
      hardwareDeliveryCompleted: 70,
      hardwareInstallationScheduled: 60,
      hardwareInstallationCompleted: 50,
      trainingScheduled: 40,
      trainingCompleted: 30,
      fullyCompleted: 25
    }
  });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.send(`
    <html>
      <head><title>StoreHub Onboarding API - Demo</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
        <h1>🚀 StoreHub Onboarding API - Demo Mode</h1>
        <p><strong>Status:</strong> Running in demo mode with mock data</p>
        
        <h2>📋 Available Endpoints:</h2>
        <ul>
          <li><strong>GET</strong> /api/v1/auth/me - Get current user</li>
          <li><strong>GET</strong> /api/v1/merchant/onboarding - Get onboarding details</li>
          <li><strong>GET</strong> /api/v1/merchant/progress - Get progress tracker</li>
          <li><strong>GET</strong> /api/v1/merchant/delivery-dates - Get available delivery dates</li>
          <li><strong>POST</strong> /api/v1/merchant/schedule - Schedule appointment</li>
          <li><strong>GET</strong> /api/v1/admin/onboarding - List onboarding records</li>
          <li><strong>GET</strong> /api/v1/reports/onboarding-funnel - Get analytics</li>
        </ul>

        <h2>🧪 Test the API:</h2>
        <p>Try these commands in your terminal:</p>
        <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
# Get merchant progress
curl http://localhost:3001/api/v1/merchant/progress

# Get available delivery dates  
curl http://localhost:3001/api/v1/merchant/delivery-dates

# Schedule delivery
curl -X POST http://localhost:3001/api/v1/merchant/schedule \\
  -H "Content-Type: application/json" \\
  -d '{"type": "hardware_delivery", "date": "2024-01-15"}'

# Get analytics
curl http://localhost:3001/api/v1/reports/onboarding-funnel
        </pre>

        <h2>🛠️ Next Steps:</h2>
        <p>This is a demo API. For the full system:</p>
        <ol>
          <li>Set up PostgreSQL database</li>
          <li>Configure environment variables</li>
          <li>Run the full NestJS application</li>
          <li>Build the React frontend</li>
        </ol>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`
🚀 StoreHub Onboarding API Demo
📍 Server running on port ${PORT}
📚 API Documentation: http://localhost:${PORT}/api/docs
🧪 Test endpoint: http://localhost:${PORT}/api/v1/merchant/progress

Ready to accept requests!
  `);
});
