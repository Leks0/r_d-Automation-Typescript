import { describe, expect, test } from 'vitest';
import { ConfigService } from 'src/services/config.service';
import { FetchApiService } from 'src/services/fetch-api.service';
import { ImagesApi } from 'src/apis/the-cat-api/images.api';
import { ImageDto } from '../../src/dto/the-cat-api/image.dto';

describe('The Cats API Images Tests', () => {
    const configService = new ConfigService();
    const config = configService.getConfig();
    const fetchApi = new FetchApiService(config.api.baseUrl, {apiKey: config.auth.apiKey});
    const imagesApi = new ImagesApi(fetchApi);

    const context: Record<string, unknown> = {};

    describe('POST Requests', () => {
        test('Upload Image test', async () => {
            const [response, image] = await imagesApi.uploadImage('pictures/the_cat.jpg', 'VILE');

            expect(response.status).toBeOneOf([200, 201]);
            expect(image.id).toBeDefined;

            context.imageId = image.id;
        });

        test('Add breed to uploaded image test', async () => {
            const imageId = context.imageId as string;
            expect(imageId).toBeDefined();

            const breedId = 'aege';
            const [response, responseData] = await imagesApi.addBreedToImage(imageId, breedId);

            expect(response.status).toBeOneOf([200, 201]);
            expect(responseData).toHaveProperty('id');
            expect(responseData.id).toBe(breedId);

            context.breedId = responseData.id;
        });
    });
    describe ('GET Requests', () => {
        test('Search images', async () => {
            const params = {
                size: 'med',
                mime_types: 'jpg',
                format: 'json',
                has_breeds: true,
                order: 'RANDOM',
                limit: 1,
                include_breeds: 1,
                include_categories: 1
            };

            const [response, images] = await imagesApi.imageSearch(params);

            expect(response.status).toBe(200);
            expect(images).toBeInstanceOf(Array);
            expect(images.length).toBe(1);

            const image = images[0];

            expect(image).toHaveProperty('id');
            expect(image).toHaveProperty('url');
            expect(image).toHaveProperty('breeds');
            expect(image.breeds.length).toBeGreaterThan(0);
        });

        test('Get image by ID', async () => {
            const imageId = context.imageId as string;
            expect(imageId).toBeDefined();

            const [response, responseData] = await imagesApi.getImageById(imageId);

            const image = responseData as ImageDto;
            expect(response.status).toBeOneOf([200, 201]);
            expect(image).toHaveProperty('id');
            expect(image.id).toBe(imageId);
            expect(image).toHaveProperty('url');
            expect(image.url).toContain(imageId);
        });

        test('Get the raw analysis results for uploaded image', async () => {
            const imageId = context.imageId as string;
            expect(imageId).toBeDefined();

            const [response, responseData] = await imagesApi.imageAnalysis(imageId);

            expect(response.status).toBeOneOf([200, 201]);
            expect(responseData).toBeInstanceOf(Array);
            expect(responseData[0]).toHaveProperty('labels');
        });

        test('Get only images from your account', async () => {
            const imageId = context.imageId as string;
            expect(imageId).toBeDefined();

            const [response, responseData] = await imagesApi.getMyImages();
            const foundImage = responseData.find((img) => img.id === imageId);

            expect(response.status).toBeOneOf([200, 201]);
            expect(responseData).toBeInstanceOf(Array);
            expect(foundImage).toBeDefined();
            expect(foundImage).toHaveProperty('id', imageId);
            expect(foundImage).toHaveProperty('url');
        });

        test('Get list of breeds from image', async () => {
            const imageId = context.imageId as string;
            const breedId = context.breedId as string;
            expect(imageId).toBeDefined();
            expect(breedId).toBeDefined();

            const [response, responseData] = await imagesApi.getBreeds(imageId);

            expect(response.status).toBeOneOf([200, 201]);
            expect(responseData).toBeInstanceOf(Array);
            expect(responseData.length).toBeGreaterThan(0);
            expect(responseData[0]).toHaveProperty('id', breedId);
        });
    });

    describe('DELETE Requests', () => {
        test('Delete breed from image', async () => {
            const imageId = context.imageId as string;
            const breedId = context.breedId as string;
            expect(imageId).toBeDefined();
            expect(breedId).toBeDefined();

            const [response, statusCode] = await imagesApi.delBreedById(imageId, breedId);
            expect(statusCode).toBe(204);
            expect(response).toHaveReturned;
        });

        test('Delete image', async () => {
            const imageId = context.imageId as string;
            expect(imageId).toBeDefined();

            const [response, statusCode] = await imagesApi.imageDelete(imageId);
            expect(statusCode).toBe(204);
            expect(response).toHaveReturned;
        });
    });
});

