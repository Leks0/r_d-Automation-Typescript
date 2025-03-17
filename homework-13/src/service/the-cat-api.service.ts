import axios from 'axios';
import { ImageDto } from '../models/image.dto';
import { VoteDto } from '../models/vote.dto';
import { FavoriteDto } from '../models/favorite.dto';

interface ApiResponse<T> {
    status: number;
    data: T;
}

export class TheCatApi {
    public readonly baseUrl: string;
    private readonly apiKey: string;

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

    public async getMyImages(): Promise<ApiResponse<ImageDto[]>> {
        const response = await axios.get<ImageDto[]>(`${this.baseUrl}/images/search`, {
            headers: this.getHeaders()
        });
        return { status: response.status, data: response.data };
    }

    public async getImageById(imageId: string): Promise<ApiResponse<ImageDto>> {
        const response = await axios.get<ImageDto>(`${this.baseUrl}/images/${imageId}`, {
            headers: this.getHeaders()
        });
        return { status: response.status, data: response.data };
    }

    public async voteForImage(imageId: string, subId: string, value: number): Promise<ApiResponse<{ id: number }>> {
        const response = await axios.post<{ id: number }>(
            `${this.baseUrl}/votes`,
            {
                image_id: imageId,
                sub_id: subId,
                value: value
            },
            {
                headers: this.getHeaders()
            }
        );
        return { status: response.status, data: response.data };
    }

    public async getVotes(subId?: string): Promise<ApiResponse<VoteDto[]>> {
        const response = await axios.get<VoteDto[]>(`${this.baseUrl}/votes`, {
            headers: this.getHeaders(),
            params: subId ? { sub_id: subId } : undefined
        });
        return { status: response.status, data: response.data };
    }

    public async getVoteById(voteId: number): Promise<ApiResponse<VoteDto>> {
        const response = await axios.get<VoteDto>(`${this.baseUrl}/votes/${voteId}`, {
            headers: this.getHeaders()
        });

        return { status: response.status, data: response.data };
    }

    public async addImageToFavorites(imageId: string, subId: string): Promise<ApiResponse<{ id: number }>> {
        const response = await axios.post<{ id: number }>(
            `${this.baseUrl}/favourites`,
            {
                image_id: imageId,
                sub_id: subId
            },
            {
                headers: this.getHeaders()
            }
        );
        return { status: response.status, data: response.data };
    }

    public async getFavorites(subId?: string): Promise<ApiResponse<FavoriteDto[]>> {
        const response = await axios.get<FavoriteDto[]>(`${this.baseUrl}/favourites`, {
            headers: this.getHeaders(),
            params: subId ? { sub_id: subId } : undefined
        });
        return { status: response.status, data: response.data };
    }

    public async removeFavorite(favoriteId: number): Promise<ApiResponse<{ message: string }>> {
        const response = await axios.delete<{ message: string }>(`${this.baseUrl}/favourites/${favoriteId}`, {
            headers: this.getHeaders()
        });
        return { status: response.status, data: response.data };
    }
}
