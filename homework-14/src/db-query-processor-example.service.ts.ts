import { DbConnectionExample } from './db-connection-example';
import { ClassExample } from './class-example';

export class DbQueryProcessorExampleService {
    private _dbConnection: DbConnectionExample;

    public constructor(dbConnection: DbConnectionExample) {
        this._dbConnection = dbConnection;
    }

    public findYoungerThen(age: number): ClassExample[] {
        if (age <= 0) {
            throw new Error('Age should be greater then 0');
        } else if (age > 100) {
            throw new Error('Age should be less then 100');
        }

        const res = this._dbConnection.findYoungerThen(age).filter(person => person.age <= age);
        return res;
    }

    public findOlderThen(age: number): ClassExample[] {
        if (age <= 0) {
            throw new Error('Age should be greater then 0');
        } else if (age > 100) {
            throw new Error('Age should be less then 100');
        }

        return this._dbConnection.findOlderThen(age).filter(person => person.age > age);
    }
}
