import forgotPasswordPage from '../support/pages/forgot-password'
import resetPasswordPage from '../support/pages/reset-password'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('esqueci minha senha', () => {
    it('deve poder solicitar o resgate de senha', () => {

        const user = {
            name: 'João Esquecido',
            email: 'joao@gmail.com',
            password: 'pwd123',
            is_shaver: false
        }

        cy.createUser(user)

        forgotPasswordPage.go()
        forgotPasswordPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'

        forgotPasswordPage.noticeShouldBe(message)

    })

    context('quando o usuário solicita resgate de senha', () => {
        const user = {
            name: 'Will Souza',
            email: 'will@yahoo.com',
            password: 'pwd123',
            is_shaver: false
        }

        beforeEach(() => {
            cy.createUser(user)
            cy.recoveryPassword(user.email)
            cy.getToken(user.email)

        })

        it('deve poder cadastrar uma nova senha', () => {
            resetPasswordPage.go(Cypress.env('token'))
            resetPasswordPage.submit('abc123', 'abc123')

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            resetPasswordPage.noticeShouldBe(message)
            cy.log(Cypress.env('token'))
        })

        afterEach(() => { 
            loginPage.submit(user.email, 'abc123')
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

    })
})