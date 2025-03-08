import { expect } from 'chai';
import { UserEntity } from '../src/hw8/abstraction';

describe('UserEntity', () => {
    it('Екземпляр з валідними даними успішно створено', () => {
        const user = new UserEntity(1, 'Іван Попов', 'i.popov@gmail.com');

        expect(user.getId()).to.equal(1);
        expect(user.getName()).to.equal('Іван Попов');
        expect(user.getEmail()).to.equal('i.popov@gmail.com');
    });

    it('Опис успішно повернуто', () => {
        const user = new UserEntity(2, 'Гадя Петрович', 'g.petrovich@gmail.com');
        const description = user.getDescription();

        expect(description).to.equal('User Гадя Петрович (ID: 2 with email g.petrovich@gmail.com)');
    });

    it('Змінений email успішно повернуто', () => {
        const user = new UserEntity(3, 'Петро Григоренко', 'p.grygorenko@gmail.com');
        const newEmail = 'petro.grygorenko@gmail.com';

        const result = user.updateEmail(newEmail);

        expect(result).to.equal(newEmail);
        expect(user.getEmail()).to.equal(newEmail);
    });

    it('Дату створення успішно повернуто', () => {
        const user = new UserEntity(4, 'Яна Олександрова', 'y.oleksandrova@gmail.com');
        const creationDate = user.getCreationDate();

        expect(creationDate).to.be.an.instanceOf(Date);
    });
});
