import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    if (!clientID || !clientSecret) {
      console.warn('Google OAuth credentials not found. Google authentication will be disabled.');
      // Provide dummy values to prevent strategy initialization errors
      super({
        clientID: 'dummy',
        clientSecret: 'dummy',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/auth/google/callback',
        scope: ['email', 'profile'],
      });
      return;
    }

    super({
      clientID,
      clientSecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    
    // Check if email is from storehub.com domain
    const email = emails[0].value;
    if (!email.endsWith('@storehub.com')) {
      return done(new Error('Access denied: Only @storehub.com emails are allowed'), false);
    }

    const user = {
      email: email,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      role: 'admin', // All @storehub.com users get admin role
    };

    done(null, user);
  }
} 