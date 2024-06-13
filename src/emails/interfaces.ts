import type { ErrorResponse, Interval } from '../interfaces';

// Rate Limiting
//////////////////////////////////////////////
type RateLimit = {
    limit: number;
    interval: Interval;
    identifier: string;
};

// Send email
//////////////////////////////////////////////
export interface SendEmailOptions {
    email: string;
    sender: string;
    rateLimit?: RateLimit;
}

export interface SendEmailResponseSuccess {
    id: string;
}

export interface SendEmailResponse {
    data: SendEmailResponseSuccess | null;
    error: ErrorResponse | null;
}

// Verify email
//////////////////////////////////////////////
export interface VerifyOptions {
    id: string;
    otp: string;
    rateLimit?: RateLimit;
}

export interface VerifyResponseSuccess {
    id: string;
}

export interface VerifyResponse {
    data: VerifyResponseSuccess | null;
    error: ErrorResponse | null;
}
