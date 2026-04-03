/**
 * 🛡️ AFRIDAM CLINICAL AUTH TYPES (Rule 6 Synergy)
 * Version: 2026.1.9 (Full Schema Alignment)
 * Focus: High-Precision Type alignment for the Intelligence Hub.
 */

export interface OrganizationLoginDto {
  email: string;
  password: string;
}

export interface CreateOrganizationDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  logoUrl: string;
  brandingColors: {
    primary: string;
    secondary: string;
  };
  licenseUrl: string;
  licenseNumber: string;
  isActive: boolean;
}

export interface VerifyCodeDto {
  email: string;
  code: string;
}

/**
 * 🚀 THE SYNERGY FIX: WRAPPED AUTH RESPONSE
 * Synced with the 2026 NestJS 'resultData' Envelope.
 */

export interface AuthResponse {
  message: string;
  statusCode: number;
  resultData: {
    accessToken: string;
    refreshToken: string;
    isActive: boolean;
    displayName:string;
    role: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      sex: string;
      phoneNo: string;
      onboardingCompleted?: boolean;
    };
  };
}


