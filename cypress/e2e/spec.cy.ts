describe('Home page', () => { 
  it('navigates to the project page', () => {
    cy.visit('http://localhost:4321')
    cy.contains('Projects').click()
    cy.url().should('include', '/projects')
  })
})
