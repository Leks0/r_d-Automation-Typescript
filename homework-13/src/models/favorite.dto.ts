export interface FavoriteDto {
    id: number;
    image_id: string;
    sub_id: string;
    created_at: string;
    image: {
        id: string;
        url: string;
    };
}
