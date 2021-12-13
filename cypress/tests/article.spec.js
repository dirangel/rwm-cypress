/// <reference types="cypress" />

const Chance = require('chance')
const chance = new Chance()

const title = chance.string({ pool: 'abcde' })
const description = chance.paragraph({ sentences: 1 })
const paragraph = chance.paragraph({ sentences: 4 })

describe('Article', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('Cadastro de novo artigo com sucesso', () => {
    cy.get('[href*=editor]').click()

    cy.get('[ng-model$=title]').type(title)
    cy.get('[ng-model$=description]').type(description)
    cy.get('[ng-model$=body]').type(paragraph)
    cy.get('[ng-model$=tagField]').type('cypress')

    cy.contains('button', 'Publish Article').click()

    cy.get('h1').should('have.text', title)
    cy.get('div.ng-binding p').should('have.text', paragraph)
  })
})
