import { IApiService } from 'src/services/interfaces/i-api.service';
import * as fs from 'fs';
import { BreedDto, ImageDto } from 'src/dto/the-cat-api';

export class ImagesApi {
    public constructor(private apiService: IApiService) {}

    public async imageSearch(params?: Record<string, string | number | boolean>): Promise<[Response, ImageDto[]]> {
        const endpoint = '/images/search';
        const response = await this.apiService.get(endpoint, params);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async getImageById(imageId: string): Promise<[Response, ImageDto]> {
        const endpoint = `/images/${imageId}`;
        const response = await this.apiService.get(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async imageAnalysis(imageId: string): Promise<[Response, unknown[]]> {
        const endpoint = `/images/${imageId}/analysis`;
        const response = await this.apiService.get(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async getMyImages(): Promise<[Response, ImageDto[]]> {
        const endpoint = '/images';
        const response = await this.apiService.get(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async uploadImage(imagePath: string, subId?: string, breeds?:string[]): Promise<[Response, ImageDto]> {
        const file = fs.readFileSync(imagePath);
        const binFile = new File([file], '71.jpg', { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('file', binFile);
        subId ? formData.append('sub_id', subId) : null;
        breeds ? formData.append('breeds', breeds.join(',')) : null;

        const endpoint = '/images/upload';
        const response = await this.apiService.post(endpoint, formData);
        const responseData = await response.json();

        return await [response as Response, responseData];
    }

    public async imageDelete(imageId: string): Promise<[Response, number]> {
        const endpoint = `/images/${imageId}`;
        const response = await this.apiService.del(endpoint);

        return await [response, response.status];
    }

    public async getBreeds(imageId: string): Promise<[Response, BreedDto[]]> {
        const endpoint = `/images/${imageId}/breeds`;
        const response = await this.apiService.get(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async addBreedToImage(imageId: string, breedId: string): Promise<[Response, ImageDto]> {
        const endpoint = `/images/${imageId}/breeds`;
        const body = { breed_id: breedId };
        const response = await this.apiService.post(endpoint, body);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async delBreedById(imageId: string, breedId: string): Promise<[Response, number]> {
        const endpoint = `/images/${imageId}/breeds/${breedId}`;
        const response = await this.apiService.del(endpoint);

        return await [response, response.status];
    }
}
