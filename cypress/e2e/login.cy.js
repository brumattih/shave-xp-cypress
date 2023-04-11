import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            // dado que eu tenho um novo usuário cadastrado 
            const user = data.success

            cy.createUser(user)

            // quando submeto o form de login com esse usuário
            loginPage.submit(user.email, user.password)

            // então devo ser logado com sucesso
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            const user = data.invpass

            loginPage.submit(user.email, user.password)
            loginPage.shared.noticeErrorShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            const user = data.emailnotfound

            loginPage.submit(user.email, user.password)
            loginPage.shared.noticeErrorShouldBe(message)

        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('senha muito curta', () => {
        const passwords = data.shortpass

        passwords.forEach((password) => {
            it(`não deve logar com a senha ${password}`, () => {
                loginPage.submit('brumatti@teste.com', password)
                loginPage.shared.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        const emails = data.invemails

        emails.forEach((email) => {
            it(`não deve logar com o email ${email}`, () => {
                loginPage.submit(email, 'pwd123')
                loginPage.shared.alertShouldBe('Informe um email válido')
            })
        })
    })
})