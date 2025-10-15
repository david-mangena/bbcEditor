/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      clickElement(selector: string): Chainable<void>;
      typeText(selector: string, text: string): Chainable<void>;
      verifyText(selector: string, text: string): Chainable<void>;
      clickLinkByText(text: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("clickElement", (selector: string) => {
  cy.get(selector, { timeout: 10000 })
    .should("be.visible")
    .click({ force: true });
});

Cypress.Commands.add("typeText", (selector: string, text: string) => {
  cy.get(selector)
    .should("be.visible")
    .clear()
    .type(text, { delay: 50 });
});

Cypress.Commands.add("verifyText", (selector: string, text: string) => {
  cy.get(selector)
    .should("be.visible")
    .and("have.text", text);
});

Cypress.Commands.add("clickLinkByText", (text: string) => {
  cy.contains("a", text, { matchCase: false })
    .should("be.visible")
    .click({ force: true });
});

export {}; // marks file as a module
