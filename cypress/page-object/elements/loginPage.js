class LoginPage {
    constructor() {
        this.url = '/';
    }
    
    userNameField() {
        return cy.get('#user-name')
    }

    passwordField() {
        return cy.get('#password')
    }

    loginButton() {
        return cy.get('#login-button');
    }

    errorMessage() {
        return cy.get(".error");
    }

    open() {
        cy.visit(this.url);
    }

    loginForm(userName, password){
        this.userNameField().type(userName);
        this.passwordField().type(password);
        this.loginButton().click();
    }
}
module.exports = LoginPage;