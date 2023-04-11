Cypress.Commands.add('createUser', (user) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_helper_user'),
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })

})

Cypress.Commands.add('deleteUser', (user) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.env('api_helper_user') + user.email
    }).then(function (response) {
        expect(response.status).to.eq(204)
    })

})

Cypress.Commands.add('recoveryPassword', (email) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_server_recoverypass'),
        body: { email: email }
    }).then(result => {
        expect(result.status).to.eql(204)
    })
})

Cypress.Commands.add('getToken', (email) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('api_helper_token')  + email
    }).then(result => {
        expect(result.status).to.eql(200)
        cy.log(result.body.token)
        Cypress.env('token', result.body.token)
    })

})

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_server_sessions'),
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