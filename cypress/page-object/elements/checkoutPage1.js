class CheckoutPage1 {
    constructor() {
        this.url = '/checkout-step-one.html';
    }

    firstNameField() {
        return cy.get('#first-name');
    }
    
    lastNameField() {
        return cy.get('#last-name');
    }

    postalCodeField() {
        return cy.get('#postal-code');
    }

    continueButton() {
        return cy.get('#continue');
    }

    errorMessage() {
        return cy.get('.error-message-container');    
    }

    fillForm(firstName, lastName, postalCode){
        this.firstNameField().type(firstName);
        this.lastNameField().type(lastName);
        this.postalCodeField().type(postalCode);
        this.continueButton().click();
    }
}
module.exports = CheckoutPage1;