import { IApiService } from 'src/services/interfaces/i-api.service';
import * as fs from 'fs';
import { ImageDto } from 'src/dto/the-cat-api';

export class ImagesApi {
    public constructor(private apiService: IApiService) {}

    public async imageSearch(): Promise<[Response, ImageDto[]]> {
        const endpoint = '/images/search';
        const response = await this.apiService.get(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async getImageById(imageId: string): Promise<[Response, ImageDto[]]> {
        const endpoint = `/images/${imageId}`;
        const response = await this.apiService.get(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async imageAnalysis(imageId: string): Promise<[Response, ImageDto[]]> {
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

    public async imageUpload(imagePath: string, subId?: string, breeds?:string[]): Promise<[Response, ImageDto]> {
        const formData = new FormData();
        const file = fs.readFileSync(imagePath);
        const binFile = new File([file], 'cat_picture.webp', { type: 'image/webp' });
        formData.append('file', binFile);
        subId ? formData.append('sub_id', subId) : null;
        breeds ? formData.append('breeds', breeds.join(',')) : null;

        const endpoint = '/image/upload';
        const response = await this.apiService.postFile(endpoint, formData);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async imageDelete(imageId: string): Promise<[Response, ImageDto]> {
        const endpoint = `/images/${imageId}`;
        const response = await this.apiService.del(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }

    public async getBreeds(): Promise<[Response, ImageDto[]]> {
        const endpoint = '/images';
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

    public async delBreedById(imageId: string, breedId: string): Promise<[Response, ImageDto[]]> {
        const endpoint = `/images/${imageId}/breeds/${breedId}`;
        const response = await this.apiService.del(endpoint);
        const responseData = await response.json();

        return await [response, responseData];
    }
}
