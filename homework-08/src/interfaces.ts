/**
 * Описати повернути JSON інтерфейсом або класом.
 */

// Інтерфейси для вкладених обʼєктів:
export interface IGeo {
    lat: string;
    lng: string;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IAddress {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: IGeo;
}

// Інтерфейс для розширеної інформації про юзера
export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;
}

// Інтерфейс для короткої інформації про юзера
export interface IUserSummary {
    id: number;
    fullname: string;
    city: string;
    companyName: string;
    contacts: {
        email: string;
        phone: string;
    };
}
