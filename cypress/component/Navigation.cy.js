describe('Navigation.cy.js', () => {
  it('should navigate to the post page', () => {
    // cy.mount()
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('Link[href*="post"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/post')

  })
})