"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantLoginController = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
let MerchantLoginController = class MerchantLoginController {
    async serveMobileLogin(res, token) {
        const loginPagePath = path.join(__dirname, '..', '..', '..', 'merchant-login-mobile.html');
        if (fs.existsSync(loginPagePath)) {
            res.sendFile(loginPagePath);
        }
        else {
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
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;
                }
                .container { 
                    background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    width: 100%; max-width: 400px; padding: 40px 30px; text-align: center;
                }
                .logo { margin-bottom: 30px; }
                .logo h1 { color: #333; font-size: 28px; font-weight: 700; margin-bottom: 8px; }
                .logo p { color: #666; font-size: 14px; }
                .welcome-text { margin-bottom: 30px; }
                .welcome-text h2 { color: #333; font-size: 24px; font-weight: 600; margin-bottom: 8px; }
                .welcome-text p { color: #666; font-size: 16px; line-height: 1.5; }
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
                    cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; margin-bottom: 20px;
                }
                .login-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3); }
                .login-btn:active { transform: translateY(0); }
                .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .error-message { background: #fee; color: #c53030; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; display: none; }
                .success-message { background: #f0fff4; color: #38a169; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; display: none; }
                .loading { display: none; margin: 20px 0; }
                .loading-spinner { 
                    border: 3px solid #f3f3f3; border-top: 3px solid #667eea; border-radius: 50%;
                    width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;
                }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .help-text { color: #666; font-size: 14px; line-height: 1.5; margin-top: 20px; }
                .help-text a { color: #667eea; text-decoration: none; }
                .help-text a:hover { text-decoration: underline; }
                @media (max-width: 480px) {
                    .container { padding: 30px 20px; margin: 10px; }
                    .logo h1 { font-size: 24px; }
                    .welcome-text h2 { font-size: 20px; }
                    .form-group input { font-size: 16px; }
                }
                @media screen and (-webkit-min-device-pixel-ratio: 0) {
                    select, textarea, input[type="text"], input[type="password"], 
                    input[type="datetime"], input[type="datetime-local"], 
                    input[type="date"], input[type="month"], input[type="time"], 
                    input[type="week"], input[type="number"], input[type="email"], 
                    input[type="url"], input[type="search"], input[type="tel"], 
                    input[type="color"] { font-size: 16px; }
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
                <div class="loading" id="loading">
                    <div class="loading-spinner"></div>
                    <p>Verifying your access...</p>
                </div>
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
                    const loading = document.getElementById('loading');
                    const errorMessage = document.getElementById('errorMessage');
                    const successMessage = document.getElementById('successMessage');
                    if (!token) {
                        showError('Please enter your access token');
                        return;
                    }
                    loginBtn.disabled = true;
                    loginBtn.textContent = 'Verifying...';
                    loading.style.display = 'block';
                    hideMessages();
                    try {
                        const response = await fetch('/api/v1/merchant/auth', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token })
                        });
                        const data = await response.json();
                        if (data.success) {
                            showSuccess('Login successful! Redirecting to dashboard...');
                            localStorage.setItem('merchantToken', token);
                            localStorage.setItem('merchantData', JSON.stringify(data.data));
                            setTimeout(() => window.location.href = '/merchant/dashboard', 1500);
                        } else {
                            showError(data.message || 'Invalid access token. Please check and try again.');
                        }
                    } catch (error) {
                        console.error('Login error:', error);
                        showError('Connection error. Please check your internet connection and try again.');
                    } finally {
                        loginBtn.disabled = false;
                        loginBtn.textContent = 'Continue to Dashboard';
                        loading.style.display = 'none';
                    }
                });
                function showError(message) {
                    const errorMessage = document.getElementById('errorMessage');
                    errorMessage.textContent = message;
                    errorMessage.style.display = 'block';
                    document.getElementById('successMessage').style.display = 'none';
                }
                function showSuccess(message) {
                    const successMessage = document.getElementById('successMessage');
                    successMessage.textContent = message;
                    successMessage.style.display = 'block';
                    document.getElementById('errorMessage').style.display = 'none';
                }
                function hideMessages() {
                    document.getElementById('errorMessage').style.display = 'none';
                    document.getElementById('successMessage').style.display = 'none';
                }
                window.addEventListener('pageshow', function(event) {
                    if (event.persisted) {
                        document.getElementById('loginForm').reset();
                        hideMessages();
                    }
                });
            </script>
        </body>
        </html>
      `);
        }
    }
};
exports.MerchantLoginController = MerchantLoginController;
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MerchantLoginController.prototype, "serveMobileLogin", null);
exports.MerchantLoginController = MerchantLoginController = __decorate([
    (0, common_1.Controller)('merchant')
], MerchantLoginController);
//# sourceMappingURL=merchant-login.controller.js.map