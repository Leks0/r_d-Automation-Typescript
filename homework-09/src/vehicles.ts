import { IVehicle } from '../src/interfaces/vehicle';
import { ICargoCarrier } from '../src/interfaces/cargo-carrier';
import { Car } from '../src/classes/car';
import { Truck } from '../src/classes/truck';

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
