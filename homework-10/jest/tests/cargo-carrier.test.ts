import { ICargoCarrier } from '../src/interfaces/cargo-carrier';
import { testCargoCarrier } from '../src/vehicles';

describe('testCargoCarrier function', () => {
    let carrierMock: jest.Mocked<ICargoCarrier>;
    let consoleLogMock: jest.SpyInstance;
    let consoleErrorMock: jest.SpyInstance;

    beforeEach(() => {
        carrierMock = {
            loadCargo: jest.fn(),
            unloadCargo: jest.fn(),
            getCurrentLoad: jest.fn().mockReturnValue(500)
        };

        consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
        consoleLogMock.mockRestore();
        consoleErrorMock.mockRestore();
    });

    test('перевірка завантаження і розвантаження (допустимі дані)', () => {
        testCargoCarrier(carrierMock);

        expect(carrierMock.loadCargo).toHaveBeenCalledWith(2500);
        expect(carrierMock.unloadCargo).toHaveBeenCalledWith(400);
        expect(carrierMock.getCurrentLoad).toHaveBeenCalledTimes(2);
    });

    test('Відображати дані в консолі', () => {
        carrierMock.getCurrentLoad.mockReturnValueOnce(2500).mockReturnValueOnce(2100);

        testCargoCarrier(carrierMock);

        expect(consoleLogMock).toHaveBeenCalledWith('\nTesting cargo carrier:');
        expect(consoleLogMock).toHaveBeenCalledWith('Current load: 2500kg');
        expect(consoleLogMock).toHaveBeenCalledWith('Current load after partial unload 2100');
    });

    test('Обробка помилок при завантаженні', () => {
        carrierMock.loadCargo.mockImplementation(() => {
            throw new Error('Перегруз');
        });

        testCargoCarrier(carrierMock);

        expect(consoleLogMock).toHaveBeenCalledWith('\nTesting cargo carrier:');
        expect(consoleLogMock).toHaveBeenCalledWith('Error during cargo operations: Перегруз');
        expect(carrierMock.unloadCargo).not.toHaveBeenCalled();
    });

    test('Обробка ексепшнів', () => {
        carrierMock.loadCargo.mockImplementation(() => {
            throw 'Геть місця немає';
        });

        testCargoCarrier(carrierMock);

        expect(consoleLogMock).toHaveBeenCalledWith('Error during cargo operations: Геть місця немає');
    });
});
