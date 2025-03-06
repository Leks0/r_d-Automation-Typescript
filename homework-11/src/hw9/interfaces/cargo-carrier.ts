// Інтерфейс для вантажівок
export interface ICargoCarrier {
    loadCargo(weight: number): void;
    unloadCargo(weight: number): void;
    getCurrentLoad(): number;
}
