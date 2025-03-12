import axios, { AxiosError } from 'axios';
import { ImageDto } from '../models/image.dto';
import { VoteDto } from '../models/vote.dto';
import { FavoriteDto } from '../models/favorite.dto';

export class TheCatApi {
    public readonly baseUrl: string;
    private readonly apiKey: string;
    private lastResponseStatus: number | null = null;

    public constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    public getHeaders(): Record<string, string> {
        return {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }

    private async handleRequest<T>(request: Promise<{ status: number; data: T }>): Promise<T> {
        try {
            const response = await request;
            this.lastResponseStatus = response.status;
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            this.lastResponseStatus = axiosError.response?.status ?? null;
            console.error('API Error:', axiosError.response?.status, axiosError.response?.data);
            throw axiosError;
        }
    }

    public getLastResponseStatus(): number | null {
        return this.lastResponseStatus;
    }

    public async getMyImages(): Promise<ImageDto[]> {
        return this.handleRequest(
            axios.get<ImageDto[]>(`${this.baseUrl}/images/search`, {
                headers: this.getHeaders()
            })
        );
    }

    public async getImageById(imageId: string): Promise<ImageDto> {
        return this.handleRequest(
            axios.get<ImageDto>(`${this.baseUrl}/images/${imageId}`, {
                headers: this.getHeaders()
            })
        );
    }

    public async voteForImage(imageId: string, subId: string, value: number): Promise<{ id: number }> {
        return this.handleRequest(
            axios.post<{ id: number }>(
                `${this.baseUrl}/votes`,
                { image_id: imageId, sub_id: subId, value: value },
                { headers: this.getHeaders() }
            )
        );
    }

    public async getVotes(subId?: string): Promise<VoteDto[]> {
        return this.handleRequest(
            axios.get<VoteDto[]>(`${this.baseUrl}/votes`, {
                headers: this.getHeaders(),
                params: subId ? { sub_id: subId } : undefined
            })
        );
    }

    public async addImageToFavorites(imageId: string, subId: string): Promise<{ id: number }> {
        return this.handleRequest(
            axios.post<{ id: number }>(
                `${this.baseUrl}/favourites`,
                { image_id: imageId, sub_id: subId },
                { headers: this.getHeaders() }
            )
        );
    }

    public async getFavorites(subId?: string): Promise<FavoriteDto[]> {
        return this.handleRequest(
            axios.get<FavoriteDto[]>(`${this.baseUrl}/favourites`, {
                headers: this.getHeaders(),
                params: subId ? { sub_id: subId } : undefined
            })
        );
    }

    public async removeFavorite(favoriteId: number): Promise<{ message: string }> {
        return this.handleRequest(
            axios.delete<{ message: string }>(`${this.baseUrl}/favourites/${favoriteId}`, {
                headers: this.getHeaders()
            })
        );
    }
}
