import { ClassExample } from './class-example';

export class DbConnectionExample {
    public persons: ClassExample[];

    public constructor(persons: ClassExample[]) {
        this.persons = persons;
    }

    public findYoungerThen(age: number): ClassExample[] {
        return this.persons.filter((person) => person.age < age);
    }

    public findOlderThen(age: number): ClassExample[] {
        return this.persons.filter((person) => person.age > age);
    }
}
