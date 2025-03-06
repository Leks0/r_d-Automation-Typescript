/**
 * Написати функцію, яка надсилатиме запит на вебресурс і повертатиме типізований обʼєкт.
 */

import { IUser } from './interfaces';

export async function fetchUserData(userId: number): Promise<IUser> {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: IUser = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch user data: ${error.message}`);
        } else {
            throw new Error('Failed to fetch user data: An unknown error occurred');
        }
    }
}
