Cypress.Commands.add('createUser', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:5000/user',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })

})

Cypress.Commands.add('deleteUser', (user) => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:5000/user/' + user.email
    }).then(function (response) {
        expect(response.status).to.eq(204)
    })

})

Cypress.Commands.add('recoveryPassword', (email) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/password/forgot',
        body: { email: email }
    }).then(result => {
        expect(result.status).to.eql(204)
    })
})

Cypress.Commands.add('getToken', (email) => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:5000/token/' + email
    }).then(result => {
        expect(result.status).to.eql(200)
        cy.log(result.body.token)
        Cypress.env('token', result.body.token)
    })

})

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: {
            email: user.email,
            password: user.password
        }
    }).then(response => {
        expect(response.status).to.eql(200)

        const { user, token } = response.body

        window.localStorage.setItem('@ShaveXP:token', token)
        window.localStorage.setItem('@ShaveXP:user', JSON.stringify(user))
    })

    cy.visit('/')
})