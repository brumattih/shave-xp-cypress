Cypress.Commands.add('signup', (name = null, email = null, password = null) => {
    cy.visit('/signup')
    cy.get('form h1')
        .should('have.text', 'Faça seu cadastro')

    cy.get('input[placeholder*=Nome]').as('name')
    cy.get('input[placeholder$=email]').as('email')
    cy.get('input[placeholder*=senha]').as('password')

    if (name) {
        cy.get('@name').type(name)
    }

    if (email) {
        cy.get('@email').type(email)
    }

    if (password) {
        cy.get('@password').type(password)
    }

    cy.contains('button', 'Cadastrar')
        .click()
})

Cypress.Commands.add('returnToLogin', () => {
    cy.visit('/signup')
    cy.contains('a', 'Voltar para login')
        .click()
    cy.get('form h1')
        .should('have.text', 'Faça seu login')
})