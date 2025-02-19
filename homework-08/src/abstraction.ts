/**
 * Сформувати файл abstraction.ts, у якому придумати композицію для наслідування та реалізувати абстракцію й наслідування.
 */

export abstract class BaseEntity {
    protected id: number;
    protected createdAt: Date;

    protected constructor(id: number){
        this.id = id;
        this.createdAt = new Date();
    }

    public abstract getDescription(): string;

    public getId(): number {
        return this.id;
    }

    public getCreationDate(): Date{
        return this.createdAt;
    }
}

export class UserEntity extends BaseEntity {
    private name: string;
    private email: string;

    public constructor(id: number, name: string, email: string){
        super(id);
        this.name = name;
        this.email = email;
    }

    public getDescription(): string {
        return `User ${this.name} (ID: ${this.id} with email ${this.email})`;
    }

    public updateEmail(newEmail: string): void {
        this.email = newEmail;
    }
}
