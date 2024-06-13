import { version } from '../package.json';
import { Emails } from './emails/emails';
import { isCodemailerErrorResponse } from './guards';
import type { ErrorResponse } from './interfaces';

const baseUrl = 'https://api.codemailer.dev';
const userAgent = `codemailer-node:${version}`;

export class Codemailer {
    private readonly headers: Headers;

    readonly emails = new Emails(this);

    constructor(readonly key?: string) {
        if (!key) {
            if (typeof process !== 'undefined' && process.env) {
                this.key = process.env.CODEMAILER_API_KEY;
            }

            if (!this.key) {
                throw new Error('Missing API key. Pass it to the constructor `new Codemailer("sk_123")`');
            }
        }

        this.headers = new Headers({
            Authorization: `Bearer ${this.key}`,
            'User-Agent': userAgent,
            'Content-Type': 'application/json',
        });
    }

    async fetchRequest<T>(path: string, options = {}): Promise<{ data: T | null; error: ErrorResponse | null }> {
        const response = await fetch(`${baseUrl}${path}`, options);

        if (!response.ok) {
            let error: ErrorResponse = {
                type: 'internal_server_error',
                message: response.statusText,
            };

            try {
                error = await response.json();
                if (isCodemailerErrorResponse(error)) {
                    return { data: null, error };
                }

                return { data: null, error };
            } catch (err) {
                if (err instanceof Error) {
                    return { data: null, error: { ...error, message: err.message } };
                }

                return { data: null, error };
            }
        }

        const data = await response.json();
        return { data, error: null };
    }

    async post<T>(path: string, payload?: unknown) {
        const requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload),
        };

        return this.fetchRequest<T>(path, requestOptions);
    }
}