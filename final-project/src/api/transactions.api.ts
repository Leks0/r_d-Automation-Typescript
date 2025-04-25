import { APIRequestContext, APIResponse } from '@playwright/test';

export class TransactionsAPI {
    public constructor(private request: APIRequestContext) {}

    public async addIncome(data: {
        date: string;
        amount: number;
        currency: string;
        comment: string
    }): Promise<APIResponse> {
        return this.request.post('/api/income', { data });
    }

    public async addExpense(data: {
        date: string;
        amount: number;
        currency: string;
        comment: string;
        cash: boolean;
    }): Promise<APIResponse> {
        return this.request.post('/api/expense', { data });
    }
}
