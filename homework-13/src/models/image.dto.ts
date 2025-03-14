export interface ImageDto {
    id: string;
    url: string;
    width: number;
    height: number;
    sub_id?: string;
    created_at: string;
    original_filename: string;
    breed_ids?: string;
    breeds: undefined[];
}
