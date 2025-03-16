import { ConfigDto, AuthConfigDto, ApiConfigDto } from 'src/dto/the-cat-api/config.dto';
import * as dotenv from 'dotenv-safe';

export class ConfigService {
    public constructor() {
        dotenv.config();
    }

    public getConfig(): ConfigDto {
        const authConfig = this.getAuthConfig();
        const apiConfig = this.getApiConfig();

        return {
            auth: authConfig,
            api: apiConfig
        };
    }

    private getAuthConfig(): AuthConfigDto {
        return { apiKey: process.env.THE_CAT_API_KEY ? process.env.THE_CAT_API_KEY : '' };
    }

    public getApiConfig(): ApiConfigDto {
        return { baseUrl: 'https://api.thecatapi.com/v1' };
    }
}
