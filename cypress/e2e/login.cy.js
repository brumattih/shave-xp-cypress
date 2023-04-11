import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = data.success

            cy.createUser(user)
            cy.submitLogin(user.email, user.password)
            cy.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            const user = data.invpass

            cy.submitLogin(user.email, user.password)
            cy.noticeErrorShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            const user = data.emailnotfound

            cy.submitLogin(user.email, user.password)
            cy.noticeErrorShouldBe(message)

        })

        it('campos obrigatórios', () => {
            cy.submitLogin()
           
            cy.get('.alert-error')
                .should('have.length', 2)
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(1).textContent).to.equal('Senha é obrigatória')
                })
        })
    })

    context('senha muito curta', () => {
        const passwords = data.shortpass

        passwords.forEach((password) => {
            it(`não deve logar com a senha ${password}`, () => {
                cy.submitLogin('brumatti@teste.com', password)
                cy.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        const emails = data.invemails

        emails.forEach((email) => {
            it(`não deve logar com o email ${email}`, () => {
                cy.submitLogin(email, 'pwd123')
                cy.alertShouldBe('Informe um email válido')
            })
        })
    })
})