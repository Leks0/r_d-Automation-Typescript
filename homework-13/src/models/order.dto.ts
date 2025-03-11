export interface OrderDto {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: 'placed' | 'approved' | 'delivered';
    complete: boolean;
}
