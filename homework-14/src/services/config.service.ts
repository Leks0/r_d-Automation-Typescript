import * as dotenv from 'dotenv-safe';
import { ConfigDto } from 'src/dto/the-cat-api/config.dto';

export class ConfigService {
    public constructor() {
        dotenv.config();
    }

    public getConfig(): ConfigDto {
        return {
            auth: { apiKey: process.env.THE_CAT_API_KEY ?? '' },
            api: { baseUrl: 'https://api.thecatapi.com/v1' }
        };
    }
}
