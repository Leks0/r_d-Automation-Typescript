export interface ConfigDto {
    auth: AuthConfigDto;
    api: ApiConfigDto;
}

export interface AuthConfigDto {
    apiKey: string;
}

export interface ApiConfigDto {
    baseUrl: string;
}
