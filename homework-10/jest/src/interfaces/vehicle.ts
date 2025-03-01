// Інтерфейс, який визначає основні операції транспортного засобу
export interface IVehicle {
    start(): void;
    stop(): void;
    getFuelLevel(): number;
    refuel(abount: number): void;
}
