import { APIRequestContext, APIResponse } from '@playwright/test';
import { RegisterData } from '../dto/register-data.dto';
import { LoginData } from '../dto/login-data.dto';

export class AuthAPI {
    public constructor(private request: APIRequestContext) {}

    public async register(data: RegisterData): Promise<APIResponse> {
        return this.request.post('/api/auth/register', { data });
    }

    public async login(data: LoginData): Promise<APIResponse> {
        return this.request.post('/api/auth/login', { data });
    }
}
