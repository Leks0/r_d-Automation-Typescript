import { expect } from 'chai';
import * as path from 'path';
import { PactV3, MatchersV3, Verifier } from '@pact-foundation/pact';
import { OrderStoreService } from '../src/service/petstore-order.service';
import { OrderDto } from '../src/models/order.dto';

const { like } = MatchersV3;

describe('PactV3 PetStore Order consumer tests', function () {
    this.timeout(30000);

    let orderStoreService: OrderStoreService;

    const provider = new PactV3({
        consumer: 'PetStore-Web-v3',
        provider: 'PetStore-API-v3'
    });

    const orderExample: OrderDto = {
        id: 5001,
        petId: 1001,
        quantity: 2,
        shipDate: '2025-03-15T12:34:56.789Z',
        status: 'placed',
        complete: true
    };

    const EXPECTED_BODY = like(orderExample);

    describe('create and then request an order', () => {
        it('returns the requested order', () => {
            provider
                .uponReceiving('create an order')
                .withRequest({
                    method: 'POST',
                    path: '/v2/store/order',
                    body: orderExample,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                .willRespondWith({
                    status: 200,
                    headers: { 'content-type': 'application/json' },
                    body: EXPECTED_BODY
                })
                .uponReceiving('get an order')
                .withRequest({
                    method: 'GET',
                    path: `/v2/store/order/${orderExample.id}`
                })
                .willRespondWith({
                    status: 200,
                    headers: { 'content-type': 'application/json' },
                    body: EXPECTED_BODY
                });

            return provider.executeTest(async (mockserver) => {
                orderStoreService = new OrderStoreService(mockserver.url);

                // ✅ Переконуємось, що замовлення створено
                const responsePost = await orderStoreService.createOrder(orderExample);
                expect(responsePost.data).to.deep.eq(orderExample);

                // ✅ Переконуємось, що замовлення можна отримати
                const response = await orderStoreService.getOrderById(orderExample.id);
                expect(response.data).to.deep.eq(orderExample);
            });
        });
    });
});

describe('PactV3 PetStore Order Provider Verification', function () {
    this.timeout(5000);

    it('validates the expectations of Matching Service', async function () {
        this.timeout(5000);

        return new Verifier({
            providerBaseUrl: 'https://petstore.swagger.io',
            pactUrls: [path.resolve(process.cwd(), './pacts/PetStore-Web-v3-PetStore-API-v3.json')]
        }).verifyProvider();
    });
});
