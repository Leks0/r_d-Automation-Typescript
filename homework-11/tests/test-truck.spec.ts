import { expect } from 'chai';
import sinon from 'sinon';
import { Truck } from '../src/hw9/classes/truck';

describe('Тестування класу "Truck"', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Обʼєкт "Truck" створюється', () => {
        const truck = new Truck('Volvo', 100, 5000);

        expect(truck.getCurrentLoad()).to.equal(0);
        expect(truck.getFuelLevel()).to.equal(0);
    });

    it('Вантаж завантажується успішно', () => {
        const truck = new Truck('Scania', 120, 10000);

        const consoleStub = sinon.stub(console, 'log');
        truck.loadCargo(3000);

        expect(truck.getCurrentLoad()).to.equal(3000);
        expect(consoleStub.calledWith('Loaded 3000kg. Current load: 3000kg')).to.be.true;
    });

    it('Вантаж вивантажується успішно', () => {
        const truck = new Truck('Scania', 120, 10000);
        const consoleStub = sinon.stub(console, 'log');

        truck.loadCargo(5000);
        consoleStub.resetHistory;
        truck.unloadCargo(2000);

        expect(truck.getCurrentLoad()).to.equal(3000);
        expect(consoleStub.calledWith('Unloaded 2000kg, Current load: 3000kg')).to.be.true;
    });

    it('Викидається помилка при перевищенні максимального завантаження', () => {
        const truck = new Truck('Scania', 120, 10000);
        const consoleStub = sinon.stub(console, 'log');
        truck.loadCargo(9000);
        consoleStub.resetHistory;

        expect(() => truck.loadCargo(2000)).to.throw('Exceeds maximum load capacity');
    });

    it('Викидається помилка при спробі вивантажити більше, ніж завантажено', () => {
        const truck = new Truck('Scania', 120, 10000);
        const consoleStub = sinon.stub(console, 'log');

        truck.loadCargo(1000);
        consoleStub.resetHistory;
        expect(() => truck.unloadCargo(2000)).to.throw('Cannot unload more than current load');
    });

    it('Методи успадковані від Vehicle викликаються успішно', () => {
        const truck = new Truck('Scania', 120, 10000);

        const startSpy = sinon.spy(truck, 'start');
        const stopSpy = sinon.spy(truck, 'stop');
        const refuelSpy = sinon.spy(truck, 'refuel');

        truck.refuel(50);
        truck.start();
        truck.stop();

        expect(startSpy.calledOnce).to.be.true;
        expect(stopSpy.calledOnce).to.be.true;
        expect(refuelSpy.calledWith(50)).to.be.true;
    });
});
