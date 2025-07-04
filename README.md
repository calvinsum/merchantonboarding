# StoreHub Merchant Onboarding System

A comprehensive merchant onboarding automation system built for StoreHub with Phase 1a & 1b features including authentication, holiday management, and training management.

## 🚀 Features

### Phase 1a - Authentication & Access Control ✅
- **Merchant Portal**: JWT authentication with 30-day expiry
- **Self-Scheduling**: Hardware delivery, installation, and training
- **Real-time Progress Tracking**: 3-step onboarding process
- **Automated Reminders**: SLA-based notification system
- **Custom Login Links**: Secure token-based merchant access

### Phase 1b - Holiday & Training Management ✅
- **Malaysian Public Holidays**: Complete 2024-2025 holiday database
- **Working Days Calculation**: Smart scheduling excluding weekends and holidays
- **Training Management System**: Trainer assignment and slot booking
- **Round-robin Assignment**: Automatic trainer allocation based on location
- **Multi-language Support**: Trainers with language preferences

## 🏗️ Architecture

### Backend (NestJS + Node.js)
- **API Server**: RESTful APIs with Swagger documentation
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **Authentication**: JWT with secure token management
- **Real-time Features**: SLA tracking and breach detection

### Frontend (React + TypeScript)
- **Multiple Interfaces**: Merchant portal, admin dashboard, onboarding manager
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Zustand for efficient state handling
- **Real-time Updates**: API integration with progress tracking

## 🛠️ Tech Stack

- **Backend**: NestJS, TypeScript, TypeORM, SQLite/PostgreSQL
- **Frontend**: React, TypeScript, Tailwind CSS, Zustand, Vite
- **APIs**: RESTful APIs with Swagger documentation
- **Authentication**: JWT with 30-day expiry
- **Notifications**: SendGrid/Twilio integration (with fallback logging)

## 📊 API Endpoints

### Core APIs
- `GET /api/v1/merchant/progress` - Merchant onboarding progress
- `POST /api/v1/admin/pre-fill` - Create merchant from pre-fill form
- `GET /api/v1/admin/merchant-link/:id` - Generate merchant login link

### Holiday Management
- `GET /api/v1/holidays` - Get Malaysian public holidays
- `GET /api/v1/holidays/working-days` - Calculate working days in range
- `GET /api/v1/holidays/next-working-day` - Find next working day
- `GET /api/v1/holidays/check/:date` - Check if date is holiday/working day

### Training Management
- `GET /api/v1/trainers` - Get all trainers
- `GET /api/v1/training-slots` - Get available training slots
- `POST /api/v1/training-slots/auto-assign` - Auto-assign trainer for location
- `PUT /api/v1/training-slots/:id/book` - Book training slot

### Analytics
- `GET /api/v1/analytics/phase1b` - Phase 1b analytics dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
# Server runs on http://localhost:3001
```

### Demo Interfaces
```bash
# Open any of these demo files in your browser:
open enhanced-onboarding-manager.html    # Complete admin interface
open phase1a-demo.html                   # Authentication demo
open demo.html                          # Basic merchant portal
```

### API Documentation
- **Swagger Docs**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/api/v1/merchant/progress

## 📱 Demo Interfaces

1. **Enhanced Onboarding Manager** (`enhanced-onboarding-manager.html`)
   - Complete dashboard with metrics and task management
   - Quick actions: Create merchants, schedule appointments, send reminders
   - Real-time analytics and reporting

2. **Phase 1a Authentication Demo** (`phase1a-demo.html`)
   - Pre-fill form workflow
   - Merchant login link generation
   - Token-based authentication testing

3. **Basic Merchant Portal** (`demo.html`)
   - Simple merchant onboarding experience
   - Progress tracking and scheduling

## 🎯 Current Implementation Status

| Feature Category | Phase 1a | Phase 1b | Status |
|------------------|----------|----------|---------|
| **Authentication & Access Control** | ✅ | ✅ | Complete |
| **Holiday & Calendar Management** | ❌ | ✅ | Complete |
| **Training Management System** | ❌ | ✅ | Complete |
| **Merchant Portal** | ✅ | ✅ | 70% Complete |
| **Internal Dashboard** | ✅ | ✅ | 60% Complete |
| **Admin Settings** | ⚠️ | ⚠️ | 30% Complete |

## 📈 Key Metrics & Analytics

- **28 Malaysian Public Holidays** (2024-2025)
- **4 Active Trainers** with multi-language support
- **3 Training Types** (Basic POS, Advanced Features, Remote Training)
- **Round-robin Assignment** for optimal trainer workload distribution
- **SLA Tracking** with automated breach detection

## 🔧 Development

### Project Structure
```
storehub-onboarding/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── admin/          # Admin management
│   │   ├── auth/           # Authentication
│   │   ├── database/       # Database entities
│   │   ├── holidays/       # Holiday management
│   │   ├── merchants/      # Merchant operations
│   │   └── shared/         # Shared services
│   ├── quick-start.js      # Demo server
│   └── quick-start-phase1a.js
├── frontend/               # React application
├── *.html                 # Demo interfaces
└── docs/                  # Documentation
```

### Available Scripts
```bash
# Backend
npm run start:dev          # Development server
npm run build              # Production build
npm run test               # Run tests

# Quick Demo
node backend/quick-start.js # Start demo server
```

## 🌟 What's Next

### Phase 1c Priorities
1. **Location & Delivery Management** - Delivery location profiles
2. **Notification & Alert System** - Automated SLA breach alerts
3. **Advanced Admin Configuration** - Complete settings management

### Production Deployment
- **Database**: PostgreSQL migration ready
- **Cloud Deployment**: Vercel (frontend) + Railway (backend)
- **Environment Variables**: Production configuration available

## 📞 Support & Contact

- **Repository**: [GitHub](https://github.com/calvinsum/merchantonboarding)
- **Demo**: Run `node backend/quick-start.js` and open demo HTML files
- **API Docs**: http://localhost:3001/api/docs (when server is running)

---

**Built with ❤️ for StoreHub Malaysia** 🇲🇾

*Last Updated: July 2024 - Phase 1a & 1b Complete*
# Force deployment Sat Jul  5 02:46:32 +08 2025
