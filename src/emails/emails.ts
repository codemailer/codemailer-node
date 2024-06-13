import type { Codemailer } from '../codemailer';
import type {
    SendEmailOptions,
    SendEmailResponse,
    SendEmailResponseSuccess,
    VerifyOptions,
    VerifyResponse,
    VerifyResponseSuccess,
} from './interfaces';

export class Emails {
    constructor(private readonly codemailer: Codemailer) {}

    async send(payload: SendEmailOptions): Promise<SendEmailResponse>{
        const data = await this.codemailer.post<SendEmailResponseSuccess>('/emails', payload);
        return data;
    }

    async verify(payload: VerifyOptions): Promise<VerifyResponse> {
        const data = await this.codemailer.post<VerifyResponseSuccess>('/emails/verify', payload);
        return data;
    }
}
