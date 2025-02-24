import { Vehicle } from '../classes/vehicle';

// Клас, який представляє авто
export class Car extends Vehicle {
    private readonly numDoors: number;

    public constructor(model: string, maxFuel: number, numDoors: number) {
        super(model, maxFuel);
        this.numDoors = numDoors;
    }

    public honk(): void {
        console.log('Beep beep! :)');
    }
}
