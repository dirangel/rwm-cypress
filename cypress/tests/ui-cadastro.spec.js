/// <reference types="cypress" />

describe('Cadastro', () => {
  it('Cadastro com sucesso', () => {
    // method
    // hostname = https://api.realworld.io
    // path = /api/users
    cy.intercept(
      {
        method: 'POST',
        url: '/api/users'
      },
      {
        statusCode: 200,
        fixture: 'cadastro-com-sucesso'
      }
    ).as('postUsers')

    cy.visit('register')
    cy.get("[placeholder = 'Username']").type('chapterdrangel08')
    cy.get("[placeholder = 'Email']").type('chapterdrangel08@email.com')
    cy.get("[placeholder = 'Password']").type('chapterdrangel08')
    cy.get('button.btn').click()
    cy.contains('No articles are here... yet.').should('be.visible')
  })

  it('Cadastro com usuário existente', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/users'
      },
      {
        statusCode: 422,
        fixture: 'cadastro-usuario-existente'
      }
    ).as('postUsers')

    cy.visit('register')
    cy.get("[placeholder = 'Username']").type('chapterdrangel01')
    cy.get("[placeholder = 'Email']").type('chapterdrangel08@email.com')
    cy.get("[placeholder = 'Password']").type('chapterdrangel08')
    cy.get('button.btn').click()
    cy.contains('username has already been taken').should('be.visible')
  })

  it('Cadastro com email existente', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/users'
      },
      {
        statusCode: 422,
        fixture: 'cadastro-email-existente'
      }
    ).as('postUsers')

    cy.visit('register')
    cy.get("[placeholder = 'Username']").type('chapterdrangel01')
    cy.get("[placeholder = 'Email']").type('chapterdrangel08@email.com')
    cy.get("[placeholder = 'Password']").type('chapterdrangel08')
    cy.get('button.btn').click()
    cy.contains('email has already been taken').should('be.visible')
  })
})
