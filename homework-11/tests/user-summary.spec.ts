import { expect } from 'chai';
import { UserSummary } from '../src/hw8/user-summary';
import { IUser } from '../src/hw8/interfaces';

describe('UserSummary', () => {
    const mockUserData: IUser = {
        id: 5,
        name: 'Грицько Шумахєр',
        username: 'schuma',
        email: 'g.schumacher@gmail.com',
        address: {
            street: 'вул. Хрещатик',
            suite: 'Буд. 25, кв. 12',
            city: 'Київ',
            zipcode: '01001',
            geo: {
                lat: '50.4501',
                lng: '30.5234'
            }
        },
        phone: '+3806643765648',
        website: 'schuma-kyiv.com',
        company: {
            name: 'Шумахер Груп',
            catchPhrase: 'Якщо у Вас ціле авто - ми йдемо до Вас',
            bs: 'контраварійне водіння'
        }
    };

    it('Summary успішно повернуто', () => {
        const summary = new UserSummary(mockUserData);

        expect(summary.id).to.equal(5);
        expect(summary.fullname).to.equal('Грицько Шумахєр');
        expect(summary.city).to.equal('Київ');
        expect(summary.companyName).to.equal('Шумахер Груп');
        expect(summary.contacts.email).to.equal('g.schumacher@gmail.com');
        expect(summary.contacts.phone).to.equal('+3806643765648');
    });

    it('Контактні дані успішно повернуто', () => {
        const summary = new UserSummary(mockUserData);
        const contact = summary.getContact();

        expect(contact).to.equal('Email: g.schumacher@gmail.com, Phone: +3806643765648');
    });
});
