// Інтерфейс, який визначає основні операції транспортного засобу
interface IVehicle {
    start(): void;
    stop(): void;
    getFuelLevel(): number;
    refuel(abount: number): void;
}

// Інтерфейс для вантажівок
interface ICargoCarrier {
    loadCargo(weight: number): void;
    unloadCargo(weight: number): void;
    getCurrentLoad(): number;
}

// Абстрактний клас, який реалізує загальний функціонал транспортного засобу
abstract class Vehicle implements IVehicle {
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

// Клас, який представляє авто
class Car extends Vehicle {
    private readonly numDoors: number;

    public constructor(model: string, maxFuel: number, numDoors: number) {
        super(model, maxFuel);
        this.numDoors = numDoors;
    }

    public honk(): void {
        console.log('Beep beep! :)');
    }
}

// Конкретний клас, який представляє вантажівку
class Truck extends Vehicle implements ICargoCarrier {
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

// Функція для тестування автівок
function testVehicle(vehicle: IVehicle): void {
    console.log('\nTesting vehicle: ');
    vehicle.refuel(50);
    vehicle.start();
    console.log(`Fuel level: ${vehicle.getFuelLevel()} litres`);
    vehicle.stop();
}

// Функція для тестування вантажівок
function testCargoCarrier(carrier: ICargoCarrier): void {
    console.log(`\nTesting cargo carrier:`);
    try {
        carrier.loadCargo(2500);
        console.log(`Current load: ${carrier.getCurrentLoad()}kg`);
        carrier.unloadCargo(400);
        console.log(`Current load after partial unload ${carrier.getCurrentLoad()}`);
    } catch (error) {
        console.log(`Error during cargo operations: ${error instanceof Error ? error.message: String(error)}`);
    }
}

// Екземпляри для тесту
const sedan = new Car("Toyota Camry", 40, 4);
const deliveryTruck = new Truck("Volvo FH", 100, 44000);

// Перевіряємо транспортні засоби
testVehicle(sedan);
testVehicle(deliveryTruck);

testCargoCarrier(deliveryTruck);
