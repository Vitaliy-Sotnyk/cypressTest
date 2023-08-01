class ProductPage {
    constructor() {
        this.url = '/inventory.html';
    }

    menuButton() {
        return cy.get('#react-burger-menu-btn');
    }

    logOutButton() {
        return cy.get('#logout_sidebar_link');
    }

    inventoryItem() {
        return cy.get('.inventory_item');
    }
 
    inventoryItemTitle(number, text) {
        return this.inventoryItem().find('.inventory_item_name').eq(number).should("contain", text);
    }

    cartButton() {
        return cy.get('#header_container .shopping_cart_link');
    }

    itemAddNumber() {
        return this.cartButton().find('.shopping_cart_badge');
    }

    selectItem(index) {
        index.map(el => {
                this.inventoryItem().find('.btn_small').eq(el).click();
        });
    }
}
module.exports = ProductPage;