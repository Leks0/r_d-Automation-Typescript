import { describe, test, expect } from 'vitest';
import { ConfigService } from 'src/services/config.service';
import { FetchApiService } from 'src/services/fetch-api.service';
import { ImagesApi } from 'src/apis/the-cat-api/images.api';


describe('TheCatAPI Images Tests', () => {
    const configService = new ConfigService();
    const config = configService.getConfig();
    const fetchApi = new FetchApiService(config.api.baseUrl, { apiKey: config.auth.apiKey});
    const imagesApi = new ImagesApi(fetchApi);
    const context : Record<string, unknown> = {};

    describe('Upload Image', () => {
        test('Upload Image test', async () => {
            const [response, image] = await imagesApi.imageUpload('data/cat_picture.webp', 'FILE');

            expect(response.status).toBe(200);
            expect(image.id).toBeDefined();

            context.imageId = image.id;
        });
    });
});
