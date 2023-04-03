class ResetPasswordPage {

    go(token) {
        cy.visit(`/reset-password?token=${token}`)

        cy.get('form h1')
            .should('have.text', 'Resetar senha')
    }

    submit(newPassword, confirmPassword) {
        cy.get('input[placeholder="Nova senha"]')
            .type(newPassword)

        cy.get('input[placeholder="Confirmação da senha"]')
            .type(confirmPassword)

        cy.contains('button', 'Alterar senha')
            .click()
    }


    noticeShouldBe(message) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', message)

    }
}

export default new ResetPasswordPage