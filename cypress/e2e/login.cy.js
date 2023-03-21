import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'


describe('login', () => {

    context('quando submeto o formulário', () => {

        it('Deve logar com sucesso', () => {
            const user = {
                name: "Henrique",
                email: 'brumatti@yahoo.com',
                password: 'pwd123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: "Henrique",
                email: 'brumatti@yahoo.com',
                password: 'pwd123456'
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: "Henrique",
                email: 'brumatti@404.com',
                password: 'pwd123'
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('senha muito curta', () => {
        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((password) => {
            it(`não deve logar com a senha ${password}`, () => {
                loginPage.submit('brumatti@teste.com', password)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        const emails = [
            'brumatti#gmail.com',
            'brumatti.com',
            '@gmail.com',
            'brumatti@',
            '1232133',
            '#@$!$@@$',
            'xp123456'
        ]

        emails.forEach((email) => {
            it(`não deve logar com o email ${email}`, () => {
                loginPage.submit(email, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})