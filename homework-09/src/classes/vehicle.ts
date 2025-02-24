import { IVehicle } from 'src/interfaces/vehicle';

// Абстрактний клас, який реалізує загальний функціонал транспортного засобу
export abstract class Vehicle implements IVehicle {
    protected running= false;
    protected fuelLevel = 0;
    protected readonly maxFuel: number;
    protected readonly model: string;

    public constructor(model: string, maxFuel: number) {
        this.model = model;
        this.maxFuel = maxFuel;
    }

    // Реалізація методів інтерфейсу IVehicle
    public start(): void {
        if (this.fuelLevel > 0) {
            this.running = true;
            console.log(`${this.model} has started`);
        } else {
            console.log(`${this.model} cant't start - no fuel`);
        }
    }

    public stop(): void {
        this.running = false;
        console.log(`${this.model} has stopped`);
    }

    public getFuelLevel(): number {
        return this.fuelLevel;
    }

    public refuel(amount: number): void {
        if (amount < 0) {
            throw new Error('Cannot refuel negative amount');
        }
        const refueledLevel = (this.fuelLevel + amount > this.maxFuel)
            ? this.maxFuel
            : this.fuelLevel + amount;
        this.fuelLevel = refueledLevel;
        console.log(`${this.model} refueled to ${this.fuelLevel} liters`);
    }

    // Захищений метод для дочірніх класів
    protected checkEngineStatus(): boolean {
        return this.running;
    }
}
