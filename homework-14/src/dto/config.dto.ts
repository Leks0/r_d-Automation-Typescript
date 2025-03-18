/** export interface ConfigDto {
    auth: AuthConfigDto;
    api: ApiConfigDto;
} **/

export interface ConfigDto {
    auth: TheCatsApiAuthConfigDto;
    api: TheCatsApiConfigDto;
}

export interface AuthConfigDto {
    theCatsApi: TheCatsApiAuthConfigDto;
}

export interface TheCatsApiAuthConfigDto {
    apiKey: string;
}


export interface ApiConfigDto {
    theCatsApi: TheCatsApiConfigDto;
}

export interface TheCatsApiConfigDto {
    baseUrl: string;
}
