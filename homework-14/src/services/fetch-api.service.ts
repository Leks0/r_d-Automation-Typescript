import { IApiService } from './interfaces/i-api.service';

export class FetchApiService implements IApiService {
    public constructor(private baseUrl: string, private secret?: { apiKey?: string }) {}

    public async get(uri: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<Response> {
        const defaultHeaders = {
            ...this.getAuthHeaders(),
            ...{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            ...headers
        };

        const queries = params ? `?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}` : '';
        return fetch(`${this.baseUrl}${uri}${queries}`, {
            method: 'GET',
            headers: defaultHeaders
        });
    }

    public async post(uri: string, body?: unknown | FormData, headers?: Record<string, string>): Promise<Response> {
        const isJson = body && !(body instanceof FormData);

        const defaultHeaders: Record<string, string> = {
            ...this.getAuthHeaders(),
            ... { 'Accept': 'application/json' },
            ...(isJson ? { 'Content-Type': 'application/json' } : {}),
            ...headers
        };

        return fetch(`${this.baseUrl}${uri}`, {
            method: 'POST',
            headers: defaultHeaders,
            ...(body ? { body: isJson ? JSON.stringify(body) : (body as FormData) } : {}) // Передаємо body, тільки якщо він є
        });
    }

    public async del(uri: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<Response> {
        const defaultHeaders = {
            ...this.getAuthHeaders(),
            ...{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            ...headers
        };

        const queries = params ? `?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}` : '';
        return fetch(`${this.baseUrl}${uri}${queries}`, {
            method: 'DELETE',
            headers: defaultHeaders
        });
    }

    private getAuthHeaders(): Record<string, string> {
        const apiKey = this.secret?.apiKey ?? '';
        return apiKey ? { 'x-api-key': apiKey } : {};
    }
}
