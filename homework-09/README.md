# Завдання:
1. Створити проєкт TS.
2. Придумати якусь послідовність абстракцій для імплементації, як-от водонагрівач-бойлер, тварина-собака-кіт, фігура-чотириктник-квадрат тощо (нова послідовність). 
3. Спроєктувати послідовність абстракцій і класів згідно з принципами ООП (4 основні принципи і як їх деталізація - SOLID). 
4. Створити функцію, яка приймала б інтерфейс як вхідний параметр і могла б працювати з різними екземплярами, які наслідують цей інтерфейс.
5. Викликати функцію з різними екземплярами класів.

# Реалізація
## Added TypeScript OOP Project
This file demonstrates OOP priciples using a Vehicle system example:
- Created base Vehicle abstract class with core methods (start, stop, refuel)
- Added interfaces IVehicle and ICargoCarrier
- Implemented Car and Truck classes extending Vehicle
- Added test functions showing how different vehicles can be handled through interfaces