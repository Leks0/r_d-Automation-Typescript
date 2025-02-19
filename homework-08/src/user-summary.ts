/**
 * Написати іншу функцію, яка братиме отриманий обʼєкт (з api.ts) і переводитиме його в інший (коротка інформація про обʼєкт).
 * Сама логіка переводу має відбуватися в конструкторі нового класу, const obj2 = new Obj2(obj1).
 */

import { IUser, IUserSummary } from './interfaces';

export class UserSummary implements IUserSummary {
    public id: number;
    public fullname: string;
    public city: string;
    public companyName: string;
    public contacts: {
        email: string;
        phone: string;
    };

    public constructor(userData: IUser) {
        this.id = userData.id;
        this.fullname = userData.name;
        this.city = userData.address.city;
        this.companyName = userData.company.name;
        this.contacts = {
            email: userData.email,
            phone: userData.phone
        };
    }

    public getContact(): string {
        return `Email: ${this.contacts.email}, Phone: ${this.contacts.phone}`;
    }
}
