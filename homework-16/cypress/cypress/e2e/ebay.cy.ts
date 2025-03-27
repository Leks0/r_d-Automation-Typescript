describe('E2E Тест: Пошук товару на eBay', () => {
    describe('template spec', () => {
        beforeEach(() => {
            cy.visit('https://www.ebay.com/'), { timeout: 20000 };
        });

        it('should perform a keyword search and verify the results', () => {
            const searchData = 'iphone 14 pro';
            cy.get('#gh-ac').type(searchData);
            cy.contains('button', 'Search').click();

            cy.url().should('include', 'https://www.ebay.com/sch/');
            cy.url().should('include', '_nkw=iphone+14+pro');

            cy.get('div.srp-river-results').should('exist');
            cy.get('ul.srp-results.srp-list').should('exist');

            cy.get('h1.srp-controls__count-heading').should('contain.text', searchData);
            cy.get('li.s-item.s-item__pl-on-bottom').should('have.length.greaterThan', 0);

            cy.get('li.s-item.s-item__pl-on-bottom')
                .first()
                .within(() => {
                    cy.get('div.s-item__wrapper').should('exist');
                    cy.get('div.s-item__image-wrapper').should('exist');
                    cy.get('div.s-item__info').should('exist');
                    cy.get('div.s-item__title').should('exist');
                });
        });

        it('should filter products by price range and condition', () => {
            const searchData = 'macbook';

            cy.get('#gh-ac').type(searchData);
            cy.contains('button', 'Search').click();

            cy.url().should('include', 'https://www.ebay.com/sch/');
            cy.url().should('include', '_nkw=macbook');

            cy.contains('Buy It Now').click();
            cy.url().should('include', 'LH_BIN=1');

            cy.get('.x-refine__multi-select-cbx:contains("New")').click({ force: true });
            cy.url().should('include', 'LH_ItemCondition=1000');
        });
    });
});
