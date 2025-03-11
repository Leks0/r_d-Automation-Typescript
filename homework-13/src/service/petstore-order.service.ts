import axios, { AxiosPromise } from 'axios';
import { OrderDto } from '../models/order.dto';

export class OrderStoreService {
    public constructor(private url: string) {}

    public getOrderById = (id: number): AxiosPromise<OrderDto> => {
        return axios.request({
            baseURL: this.url,
            headers: { Accept: 'application/json' },
            method: 'GET',
            url: `/v2/store/order/${id}`
        }).catch(error => {
            console.error(`Error fetching order ${id}:`, error.response?.status);
            throw error;
        });
    };

    public createOrder = (order: OrderDto): AxiosPromise<OrderDto> => {
        return axios.request({
            baseURL: this.url,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            url: '/v2/store/order',
            data: order
        }).catch(error => {
            console.error(`Error creating order:`, error.response?.status);
            throw error;
        });
    };
}
