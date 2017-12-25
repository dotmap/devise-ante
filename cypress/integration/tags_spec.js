/* eslint-env cypress/globals */

describe('Element Tags', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/company/awesome-game')
    cy.get('#new-element').click()
  })

  context('Default State', () => {
    it('Displays a Tags form field', () => {
      cy.get('#element-pane').find('#tags').should('be.visible')
    })

    it('Displays an "Untagged" tag', () => {
      cy.get('#element-pane').find('span.el-tag').contains('Untagged')
    })
  })

  context('Adding Tags', () => {
    beforeEach(() => {
      cy.get('#tags').find('input').type('Testing').wait(1000).type('{enter}')
    })

    it('Can create tags', () => {
      cy.get('#element-pane').find('span.el-tag').contains('Testing')
      cy.get('.el-message').contains(`"Testing" tag created.`)
    })

    it('Can retrieve created tags', () => {
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().click()
      cy.get('#tags').find('input').type('T').wait(1000)
      cy.get('.el-popper').find('li').contains('Testing')
    })

    it('Can add existing tags', () => {
      cy.get('#new-element').click()
      cy.get('#element-nav').find('li').last().click()
      cy.get('#tags').find('input').type('T').wait(1000)
      cy.get('.el-popper').find('li').last().click()
      cy.get('#element-pane').find('span.el-tag').contains('Testing')
    })
  })

  context('Removing Tags', () => {
    beforeEach(() => {
      cy.get('#tags').find('input').type('Testing').wait(1000).type('{enter}')
    })

    it('Can remove tags', () => {
      cy.get('#element-pane').find('span.el-tag').find('.el-icon-close').click()
      cy.get('#element-pane').find('span.el-tag').contains('Untagged')
      cy.get('.el-message').contains('"Testing" tag removed.')
    })

    context('Tag deletion', () => {
      it('Removes unique tags on tag deletion', () => {
        cy.get('#new-element').click()
        cy.get('#element-nav').find('li').last().click()
        cy.get('#tags').find('input').type('T').wait(1000)
        cy.get('#element-nav').find('li').first().click()
        cy.get('#element-pane').find('span.el-tag').find('.el-icon-close').click()
        cy.get('#element-nav').find('li').last().click()
        cy.get('#tags').find('input').type('T').wait(1000)
        cy.get('.el-popper').find('li').should('not.contain', 'Testing')
      })

      it('Removing a used tag does not delete it', () => {
        cy.get('#new-element').click()
        cy.get('#element-nav').find('li').last().click()
        cy.get('#tags').find('input').type('T').wait(1000).type('{downarrow}').type('{enter}')
        cy.get('#element-nav').find('li').first().click()
        cy.get('#element-pane').find('span.el-tag').find('.el-icon-close').click()
        cy.get('#new-element').click()
        cy.get('#tags').find('input').type('T').wait(1000)
        cy.get('.el-popper').find('li').contains('Testing')
      })
    })

    context('Element deletion', () => {
      beforeEach(() => {
        cy.get('#new-element').click()
        cy.get('#element-nav').find('li').last().click()
      })

      it('Removes unique tags on element deletion', () => {
        cy.get('#tags').find('input').type('T').wait(1000)
        cy.get('#element-nav').find('li').first().trigger('contextmenu')
        cy.get('.el-message-box').find('.el-button--primary').click()
        cy.get('#element-nav').find('li').last().click()
        cy.get('#tags').find('input').type('T').wait(1000)
        cy.get('.el-popper').find('li').should('not.contain', 'Testing')
      })

      it('Preserves used tags on element deletion', () => {
        cy.get('#tags').find('input').type('T').wait(1000).type('{downarrow}').type('{enter}')
        cy.get('#element-nav').find('li').first().trigger('contextmenu')
        cy.get('.el-message-box').find('.el-button--primary').click()
        cy.get('#new-element').click()
        cy.get('#tags').find('input').type('T').wait(1000)
        cy.get('.el-popper').find('li').contains('Testing')
      })
    })
  })
})
