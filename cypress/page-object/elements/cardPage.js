class CardPage {
    constructor() {
        this.url = '/cart.html';
    }
    
    cartItem() {
        return cy.get('.cart_item');
    }
    
    cartItemTitle(number, text) {
        return this.cartItem().find('.inventory_item_name').eq(number).should("contain", text);
    }

    checkoutButton() {
        return cy.get('#checkout');
    }
    
}
module.exports = CardPage;