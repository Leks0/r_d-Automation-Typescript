import { Vehicle } from '../classes/vehicle';
import { ICargoCarrier } from '../interfaces/cargo-carrier';

// Конкретний клас, який представляє вантажівку
export class Truck extends Vehicle implements ICargoCarrier {
    private currentLoad = 0;
    private readonly maxLoad: number;

    public constructor(model: string, maxFuel: number, maxLoad: number) {
        super(model, maxFuel);
        this.maxLoad = maxLoad;
    }

    public loadCargo(weight: number): void {
        if (this.currentLoad + weight <= this.maxLoad) {
            this.currentLoad += weight;
            console.log(`Loaded ${weight}kg. Current load: ${this.currentLoad}kg`);
        } else {
            throw new Error('Exceeds maximum load capacity');
        }
    }

    public unloadCargo(weight: number): void {
        if (this.currentLoad - weight >= 0) {
            this.currentLoad -= weight;
            console.log(`Unloaded ${weight}kg, Current load: ${this.currentLoad}kg`);
        } else {
            throw new Error('Cannot unload more than current load');
        }
    }

    public getCurrentLoad(): number {
        return this.currentLoad;
    }
}
