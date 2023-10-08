describe('template spec', () => {
  it('should visit the site', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Supporting Your Journey').should('exist');
  })

  it('Navigates to the login page when clicked', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/login');
  });
})