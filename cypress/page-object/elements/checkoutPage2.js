class CheckoutPage2 {
    constructor() {
        this.url = '/checkout-step-two.html';
    }

    cartItem() {
        return cy.get('.cart_item');
    }

    cartItemTitle(number, text) {
        return this.cartItem().find('.inventory_item_name').eq(number).should("contain", text);
    }

    cartItemPrice() {
        return this.cartItem().find('.inventory_item_price');
    }

    taxPrice() {
        return cy.get('.summary_tax_label');
    }

    totalPrice() {
        return cy.get('.summary_total_label');
    }

    finishButton() {
        return cy.get('#finish');
    }

    priceCalculate() {
        let total = 0;
        this.cartItemPrice().then(function (item) {
            for (var i = 0; i < item.length; i++) {
                total += Number(item[i].innerText.slice(1));
            }
        });
       this.taxPrice().then(function (item) {
            total += Number(item.text().split('$')[1]);
        });
        this.totalPrice().then(function (element) {
            expect(Number(element.text().split('$')[1])).to.be.equal(total);
        });
    }

}
module.exports = CheckoutPage2;