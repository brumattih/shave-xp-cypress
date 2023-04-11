import signupPage from '../support/pages/views/signup'

import data from '../fixtures/users-signup.json'

describe('cadastrar novo usuário', () => {
    context('quando submeto o formulário', () => {

        it('deve poder criar um novo usuário', () => {
            const user = data.validuser

            cy.deleteUser(user)

            signupPage.go()
            signupPage.submit(user.name, user.email, user.password)

            const message = 'Boas vindas, faça login para solicitar serviços!'
            signupPage.shared.noticeSuccessShouldBe(message)
        })

        it('não deve criar um usuário já existente', () => {
            const user = data.validuser

            cy.createUser(user)

            signupPage.go()
            signupPage.submit(user.name, user.email, user.password)

            const message = 'Oops! E-mail já cadastrado.'

            
            signupPage.shared.noticeErrorShouldBe(message)
        })

        it('valida campos obrigatórios', () => {
            signupPage.go()
            signupPage.submit()
            signupPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
        })

    })

    context('quando clico para voltar para a página anterior', () => {

        it('deve poder retornar para a página de login', () => {
            signupPage.go()
            signupPage.returnToLogin()
        })
    })

    context('quando insiro uma senha muito curta', () => {
        const passwords = data.shortpass
        const message = 'Pelo menos 6 caracteres'

        passwords.forEach((password) => {
            it(`não deve cadastrar com a senha ${password}`, () => {
                signupPage.go()
                signupPage.submit(data.validuser.name, data.validuser.email, password)
                signupPage.shared.alertShouldBe(message)
            })
        })
    })

    context('qunado insiro um email no formato inválido', () => {
        const emails = data.invemails
        const message = 'Informe um email válido'

        emails.forEach((email) => {
            it(`não deve cadastrar com o email ${email}`, () => {
                signupPage.go()
                signupPage.submit(data.validuser.name, email, data.validuser.password)
                signupPage.shared.alertShouldBe(message)
            })
        })
    })

})