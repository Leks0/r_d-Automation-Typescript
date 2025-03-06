import { expect } from 'chai';
import sinon from 'sinon';
import { fetchUserData } from '../src/hw8/api';
import { IUser } from '../src/hw8/interfaces';

// Типізація помилок API
interface ApiError extends Error {
    status?: number;
}

type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
type Global = typeof global & {
    fetch?: FetchFunction;
};

// Константа для базового URL
const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

describe('API Functions', () => {
    describe('Отримання даних Юзера:', () => {
        let fetchStub: sinon.SinonStub;
        let originalFetch: FetchFunction | undefined;

        // Створюємо фіктивну fetch-функцію, яку будемо використовувати замість undefined
        const dummyFetch: FetchFunction = async () => {
            return new Response(null, { status: 404 });
        };

        const mockUser: IUser = {
            id: 3,
            name: 'Clementine Bauch',
            username: 'Samantha',
            email: 'Nathan@yesenia.net',
            address: {
                street: 'Douglas Extension',
                suite: 'Suite 847',
                city: 'McKenziehaven',
                zipcode: '59590-4157',
                geo: {
                    lat: '-68.6102',
                    lng: '-47.0653'
                }
            },
            phone: '1-463-123-4447',
            website: 'ramiro.info',
            company: {
                name: 'Romaguera-Jacobson',
                catchPhrase: 'Face to face bifurcated interface',
                bs: 'e-enable strategic applications'
            }
        };

        beforeEach(() => {
            originalFetch = (global as Global).fetch;

            fetchStub = sinon.stub();
            (global as Global).fetch = fetchStub as unknown as FetchFunction;
        });

        afterEach(() => {
            (global as Global).fetch = originalFetch || dummyFetch;

            sinon.restore();
        });

        describe('Запит успішний:', () => {
            it('Дані юзера успішно отримано', async () => {
                const responseObj = {
                    ok: true,
                    json: sinon.stub().resolves(mockUser)
                };
                fetchStub.resolves(responseObj);

                const result = await fetchUserData(3);

                expect(fetchStub.calledOnce).to.be.true;
                expect(fetchStub.calledWith(`${BASE_URL}/3`)).to.be.true;
                expect(result).to.deep.equal(mockUser);
            });

            it('Помилки парсінгу JSON успішно обробляються', async () => {
                const responseObj = {
                    ok: true,
                    json: sinon.stub().rejects(new Error('JSON parsing error'))
                };
                fetchStub.resolves(responseObj);

                try {
                    await fetchUserData(3);
                    expect.fail('Очікувана помилка не виникла');
                } catch (error) {
                    expect((error as ApiError).message).to.include('Failed to fetch user data: JSON parsing error');
                }
            });
        });

        describe('Запит НЕуспішний', () => {
            it('Обробляє HTTP коди !200', async () => {
                const responseObj = {
                    ok: false,
                    status: 404
                };
                fetchStub.resolves(responseObj);

                try {
                    await fetchUserData(999);
                    expect.fail('Очікувана помилка не виникла');
                } catch (error) {
                    expect((error as Error).message).to.include('HTTP error! status: 404');
                }
            });

            it('Обробляє fetch ексепшни', async () => {
                fetchStub.rejects(new Error('Network error'));

                try {
                    await fetchUserData(3);
                    expect.fail('Expected error was not thrown');
                } catch (error) {
                    expect((error as ApiError).message).to.include('Failed to fetch user data: Network error');
                }
            });
        });
    });
});
