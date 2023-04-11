import data from '../fixtures/order.json'

describe('pedido', () => {

    const { customer, shaver, service } = data
    before(() => {

        cy.createUser(customer)
        cy.apiLogin(customer)
    })

    context('usuario logado', () => {
        it('deve poder solicitar serviços', () => {
            cy.selectShaver(shaver.name)
            cy.selectService(service.description)

            cy.confirmOrder()
            cy.hasOrder()
        })
    })
})