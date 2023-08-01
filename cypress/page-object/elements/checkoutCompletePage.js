class CheckoutCompletePage {
    constructor() {
        this.url = '/checkout-complete.html';
    }
    
    completeImage() {
        return cy.get('.complete-header');
    }

    completeMessage(text) {
        return cy.get('.complete-header').should('contain', text);
    }

    backButton() {
        return cy.get('#back-to-products');
    }
    
}
module.exports = CheckoutCompletePage;