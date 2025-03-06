import { expect, assert } from 'chai';
import { Car } from '../src/hw9/classes/car';

// Задача була протестувати саме методи класу, тому попередньо приймаю, що мені відомі типи даних тільки методів класу:
interface ITestVehicle {
    [key: string]: unknown;
    start(): void;
    stop(): void;
    refuel(amount: number): void;
    getFuelLevel(): number;
}

// Беремо клас Car для тестування методів абстрактного класу Vehicle
describe('Vehicle', () => {
    let car: ITestVehicle;


    beforeEach(() => {
        car = new Car('Test Car', 100, 4) as unknown as ITestVehicle;
    });

    describe('constructor', () => {
        it('Валідні модель і максимум пального', () => {
            expect(car.model).to.equal('Test Car');
            expect(car.maxFuel).to.equal(100);
        });
    });

    describe('start()', () => {
        it('не запускається авто без пального', () => {
            car.start();
            assert.isFalse(car.running, 'Автомобіль не повинен запускатися без пального');
            expect(car.running).to.be.false;
        });

        it('запускається авто з пальним', () => {
            car.refuel(10);
            car.start();
            assert.isTrue(car.running, 'Автомобіль з пальним повинен запуститися');
            expect(car.running).to.be.true;
        });
    });

    describe('stop()', () => {
        it('автомобіль зупиняється', () => {
            car.refuel(10);
            car.start();
            car.stop();
            assert.isFalse(car.running, 'Автомобіль повинен зупинитися');
            expect(car.running).to.be.false;
        });
    });

    describe('getFuelLevel()', () => {
        it('повертається поточний рівень пального', () => {
            expect(car.getFuelLevel()).to.equal(0);
            car.refuel(30);
            expect(car.getFuelLevel()).to.equal(30);
        });
    });

    describe('refuel()', () => {
        it('збільшується рівень пального', () => {
            car.refuel(30);
            expect(car.getFuelLevel()).to.equal(30);
        });

        it('пальне не виливається через край', () => {
            car.refuel(150);
            expect(car.getFuelLevel()).to.equal(100);
        });

        it('помилка при спробі залити від\'ємну кількість пального', () => {
            expect(() => car.refuel(-10)).to.throw('Cannot refuel negative amount');
        });
    });
});
