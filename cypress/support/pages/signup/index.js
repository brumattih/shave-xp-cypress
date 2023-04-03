class SignupPage {
    go() {
        cy.visit('/signup')
        cy.get('form h1')
            .should('have.text', 'Faça seu cadastro')
    }

    returnToLogin() {
        cy.contains('a', 'Voltar para login')
            .click()
        cy.get('form h1')
            .should('have.text', 'Faça seu login')
    }

    submit(name = null, email = null, password = null) {
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
    }

    noticeShouldBe(message) {
        cy.get('.notice p')
            .should('be.visible')
            .should('have.text', message)

    }

    alertShouldBe(message) {
        cy.get('.alert-error')
            .should('be.visible')
            .should('have.text', message)

    }

    requiredFields(nameMessage, emailMessage, passwordMessage) {
        cy.get('.alert-error')
            .should('have.length', 3)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(nameMessage)
                expect($small.get(1).textContent).to.equal(emailMessage)
                expect($small.get(2).textContent).to.equal(passwordMessage)
            })
    }
}

export default new SignupPage