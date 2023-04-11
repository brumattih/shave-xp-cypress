import data from '../fixtures/users-signup.json'

describe('cadastrar novo usuário', () => {
    context('quando submeto o formulário', () => {

        it('deve poder criar um novo usuário', () => {
            const user = data.validuser

            cy.deleteUser(user)

            cy.signup(user.name, user.email, user.password)

            const message = 'Boas vindas, faça login para solicitar serviços!'
            cy.noticeSuccessShouldBe(message)
        })

        it('não deve criar um usuário já existente', () => {
            const user = data.validuser

            cy.createUser(user)

            cy.signup(user.name, user.email, user.password)

            const message = 'Oops! E-mail já cadastrado.'
            cy.noticeErrorShouldBe(message)
        })

        it('valida campos obrigatórios', () => {
            cy.signup()

            cy.get('.alert-error')
                .should('have.length', 3)
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal('Nome é obrigatório')
                    expect($small.get(1).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(2).textContent).to.equal('Senha é obrigatória')
                })
        })
    })

    context('quando clico para voltar para a página anterior', () => {

        it('deve poder retornar para a página de login', () => {
            cy.returnToLogin()
        })
    })

    context('quando insiro uma senha muito curta', () => {
        const passwords = data.shortpass
        const message = 'Pelo menos 6 caracteres'

        passwords.forEach((password) => {
            it(`não deve cadastrar com a senha ${password}`, () => {
                cy.signup(data.validuser.name, data.validuser.email, password)
                cy.alertShouldBe(message)
            })
        })
    })

    context('quando insiro um email no formato inválido', () => {
        const emails = data.invemails
        const message = 'Informe um email válido'

        emails.forEach((email) => {
            it(`não deve cadastrar com o email ${email}`, () => {
                cy.signup(data.validuser.name, email, data.validuser.password)
                cy.alertShouldBe(message)
            })
        })
    })

})