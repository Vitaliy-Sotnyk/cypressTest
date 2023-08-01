const {
  LoginPage, 
  ProductPage,
  CardPage, 
  CheckoutPage1,
  CheckoutPage2,
  CheckoutCompletePage
} = require('../page-object/index')

const pages = {
  login: new LoginPage(),
  product: new ProductPage(),
  card: new CardPage(),
  checkoutOne: new CheckoutPage1(),
  checkoutTwo: new CheckoutPage2(),
  checkoutComplete: new CheckoutCompletePage()
};

const pagesUrl = {
  login: new LoginPage().url,
  product: new ProductPage().url,
  card: new CardPage().url,
  checkoutOne: new CheckoutPage1().url,
  checkoutTwo: new CheckoutPage2().url,
  checkoutComplete: new CheckoutCompletePage().url
};
const browserOption = Cypress.config().baseUrl;

function checkUrl(url) {
  cy.location('href').should('eq', browserOption + url);
}

describe('testing login page', () => {
  beforeEach(() => {
    pages.login.open();
  })

  it('the elements should be visible for login', () => {
    cy.request(browserOption)
      .should((response) => {
        expect(response.status).to.eq(200)
      })
    pages.login.userNameField().should('be.visible');
    pages.login.passwordField().should('be.visible');
    pages.login.loginButton().should('be.visible');
  })

  it('login with valid data', () => {
    pages.login.loginForm('standard_user', 'secret_sauce');
    checkUrl(pagesUrl.product);
  })

  it('login with wrong data', () => {
    pages.login.loginForm('locked_out_user', 'secret_sauce')
    checkUrl(pagesUrl.login);
    pages.login.errorMessage().should('be.visible')
                              .should('contain', 'Epic sadface: Sorry, this user has been locked out.');
  })
})

describe('Make purchase and log out as a standard user', () => {
  beforeEach(() => {
    pages.login.open();
    pages.login.loginForm('standard_user', 'secret_sauce')
  })

  it('select one or some items of the list', () => {
    pages.product.selectItem([2]);
    pages.product.selectItem([1, 3, 5]);
    pages.product.itemAddNumber().should('be.visible')
                                  .should('contain', '4');
  })

  it('the cart page displays the correct items', () => {
    pages.product.inventoryItemTitle(0, 'Sauce Labs Backpack');
    pages.product.inventoryItemTitle(1, 'Sauce Labs Bike Light');
    pages.product.selectItem([0, 1]);
    pages.product.cartButton().click();
    checkUrl(pagesUrl.card);
    pages.card.cartItemTitle(0, 'Sauce Labs Backpack');
    pages.card.cartItemTitle(1, 'Sauce Labs Bike Light');
  })

  it('fill the form with customer`s information', () => {
    pages.product.selectItem([0, 1]);
    pages.product.cartButton().click();
    pages.card.checkoutButton().click();
    checkUrl(pagesUrl.checkoutOne);
    pages.checkoutOne.fillForm('User', 'Test', '70225');
  })

  it('the correct items and total price (with tax) are displayed', () => {
    pages.product.inventoryItemTitle(0, 'Sauce Labs Backpack');
    pages.product.inventoryItemTitle(1, 'Sauce Labs Bike Light');
    pages.product.selectItem([0, 1]);
    pages.product.cartButton().click();
    pages.card.checkoutButton().click();
    pages.checkoutOne.fillForm('User', 'Test', '70225');
    checkUrl(pagesUrl.checkoutTwo);
    pages.checkoutTwo.cartItemTitle(0, 'Sauce Labs Backpack');
    pages.checkoutTwo.cartItemTitle(1, 'Sauce Labs Bike Light');
    pages.checkoutTwo.priceCalculate();
  })

  it('Finish purchase', () => {
    pages.product.selectItem([0, 1, 2]);
    pages.product.cartButton().click();
    pages.card.checkoutButton().click();
    pages.checkoutOne.fillForm('User', 'Test', '70225');
    pages.checkoutTwo.priceCalculate();
    pages.checkoutTwo.finishButton().click();
    checkUrl(pagesUrl.checkoutComplete);
    pages.checkoutComplete.completeMessage('Thank you for your order');
    pages.checkoutComplete.completeImage().should('be.visible');
  })

  it('Return to the main page and log out', () => {
    pages.product.selectItem([0, 1, 2]);
    pages.product.cartButton().click();
    pages.card.checkoutButton().click();
    pages.checkoutOne.fillForm('User', 'Test', '70225');
    pages.checkoutTwo.priceCalculate();
    pages.checkoutTwo.finishButton().click();
    pages.checkoutComplete.backButton().click();
    pages.product.menuButton().click();
    pages.product.logOutButton().click();
    checkUrl(pagesUrl.login);
  })

})

describe('Bonus (Optional)', () => {
  beforeEach(() => {
    pages.login.open();

  })

  it('Make purchase and log out as a problem user', () => {
    pages.login.loginForm('problem_user', 'secret_sauce')
    pages.product.selectItem([0, 1, 2]);
    pages.product.cartButton().click();
    pages.card.checkoutButton().click();
    pages.checkoutOne.fillForm('Problem user', 'Test', '70225');
    pages.checkoutOne.errorMessage().should('be.visible')
                                    .should('contain', 'Error: Last Name is required');;
    checkUrl(pagesUrl.checkoutOne);
  })

  it('Make purchase and log out as a performance glitch user', () => {
    pages.login.loginForm('performance_glitch_user', 'secret_sauce')
    pages.product.selectItem([0, 1, 2]);
    pages.product.cartButton().click();
    pages.card.checkoutButton().click();
    pages.checkoutOne.fillForm('performance glitch user', 'Test', '70225');
    pages.checkoutTwo.priceCalculate();
    pages.checkoutTwo.finishButton().click();
    pages.checkoutComplete.backButton().click();
    pages.product.menuButton().click();
    pages.product.logOutButton().click();
    checkUrl(pagesUrl.login);
  })

})