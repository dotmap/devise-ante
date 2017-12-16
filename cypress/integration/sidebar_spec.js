/* eslint-env cypress/globals */

describe('Element Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/#/company/awesome-game')
  })

  context('Initial Display', () => {
    it('Starts with no elements', () => {
      cy.get('#element-nav').find('li').should('have.length', 0)
    })

    it('Displays an add button', () => {
      cy.get('#new-element').should('be.visible')
    })
  })

  context('Creating Elements', () => {
    it('Can create elements', () => {
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').should('have.length', 1)
    })

    it('Can handle multiple elements', () => {
      cy.get('#new-element').click()
      cy.get('#new-element').click()
      cy.get('#new-element').click()
      cy.get('#new-element').click()
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').should('have.length', 5)
    })
  })

  context('Selecting Elements', () => {
    beforeEach(() => {
      cy.get('#new-element').click()
      cy.get('#new-element').click()
    })

    it('Navigates to the selected element', () => {
      cy.get('#element-nav').find('li').first().click()
      cy.url().should('eq', 'http://localhost:5000/#/company/awesome-game/1')
      cy.get('#element-pane').should('be.visible')
    })

    it('Navigates from one element to another', () => {
      cy.get('#element-nav').find('li').first().click()
      cy.get('#element-nav').find('li').last().click()
      cy.url().should('eq', 'http://localhost:5000/#/company/awesome-game/2')
    })
  })

  context('Deleting Elements', () => {
    beforeEach(() => {
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').first().trigger('contextmenu')
    })

    it('Can delete elements', () => {
      cy.get('.el-message-box').find('.el-button--primary').click()
      cy.get('#element-nav').find('li').should('have.length', 0)
    })

    it('Can cancel deletion', () => {
      cy.get('.el-message-box').find('.el-message-box__btns').children().not('.el-button--primary').click()
      cy.get('#element-nav').find('li').should('have.length', 1)
    })
  })

  context('Element ID #\'s', () => {
    it('Correctly increments element numbers', () => {
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().contains('Element 1')
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().contains('Element 2')
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().contains('Element 3')
    })

    it('Correctly tracks numbers through deletions', () => {
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().contains('Element 1')
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().contains('Element 2')
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().contains('Element 3')
      cy.get('#element-nav').find('li').last().trigger('contextmenu')
      cy.get('.el-message-box').find('.el-button--primary').click()
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').should('contain', 'Element 4').and('have.length', 3)
    })
  })
})
