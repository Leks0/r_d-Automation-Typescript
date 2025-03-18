export interface IApiService {
    get(uri: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<Response>;
    post(uri: string, body?: unknown | FormData, headers?: Record<string, string>): Promise<Response>;
    del(uri: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<Response>
}
