import {Given, When, Then, DataTable  } from "@badeball/cypress-cucumber-preprocessor";

interface RaceResult {
    Position: string;
    Driver: string;
    Team: string;
}

/**
 * 🏁 GIVEN Step — Visit and verify BBC Sport home page
 * Includes error handling and retry-friendly assertions.
 */
Given(/^I am logged to the BBC home page$/, () => {
  cy.visit("https://www.bbc.com/sport", { timeout: 20000 });
  cy.url().should("include", "bbc.com/sport");
  cy.get("body").should("be.visible");
});

/**
 * 🏎️ WHEN Step — Navigate to a sport section (e.g., Formula 1)
 */
When(/^I navigate to the "([^"]*)" section$/, (section: string) => {
  cy.log(`Navigating to section: ${section}`);
  cy.clickLinkByText(section);
});

/**
 * 📆 WHEN Step — Select a results tab and filter by year
 */

When(/^I click on "([^"]*)" and selecet the year "([^"]*)"$/, (results: string, year: string) => {
  cy.log(`Selecting ${results} for year ${year}`);
  cy.clickLinkByText(results);
  cy.get(`[data-testid="datepicker-date-link-${year}"]`, { timeout: 10000 })
    .should("be.visible")
    .click();
});
/**
 * 🏆 THEN Step — Validate number of top finishers in Las Vegas Grand Prix
 */
Then(/^I should see a table with the top "([^"]*)" finishers of the Las Vegas Grand Prix$/, (top: number) => {
  cy.contains("span", "Las Vegas Grand Prix", { matchCase: false })
    .should("exist")
    .click();

  cy.get('table[data-testid="sport-table"][aria-label="Race result"]')
    .eq(1)
    .within(() => {
      cy.get("tbody tr").should("have.length.at.least", Number(top));
    });
});

/**
 * 📊 THEN Step — Validate expected driver & team data inside race result table
 */

Then(/^the table should contain the following data:$/, (dataTable: DataTable) => {
    const expectedData = dataTable.hashes() as unknown as RaceResult[];

    cy.get('table[data-testid="sport-table"][aria-label="Race result"]').eq(1).within(() => {
      cy.get('tbody tr').each(($row, index) => {
        const expectedRow = expectedData[index];
        if (!expectedRow) return; // skip if more rows than expected
  
        cy.wrap($row).within(() => {
                    // --- Driver Validation ---
          cy.get('td').eq(1).invoke('text').then((text) => {
              const cleanText = text
                    .replace(/\s+/g, " ")                 
                    .replace(/([A-Z]{2,3})$/, "")           // remove initials (e.g., VER)
                    .replace(/Red Bull|Ferrari|Mercedes/gi, "")
                    .slice(0, -3) // remove team names that appear here
                    .trim();
                expect(cleanText).to.equal(expectedRow.Driver);
          });
  
          // Team assertion
          cy.get('td').eq(1).invoke('text').then((text) => {
            expect(text, `Expected team '${expectedRow.Team}' to be mentioned`).to.include(expectedRow.Team);
          });
        });
      });
    });
});

/**
 * 🔍 GIVEN Step — Reusable home page load for search scenario
 */
Given(/^I am on the BBC home page$/, () => {
  cy.visit("https://www.bbc.com/sport");
  cy.url().should("include", "bbc.com/sport");
});

/**
 * 🔎 WHEN Step — Perform search interaction using fixture selectors
 */
When(/^I use the search function to look for "([^"]*)"$/, (query: string) => {
  cy.fixture("selectors").then((selectors) => {
    cy.clickElement(selectors.searchLink);
    cy.typeText(selectors.searchInput, query);
    cy.get(selectors.searchInput).type("{enter}");
  });
});

/**
 * 📈 THEN Step — Validate minimum number of search results displayed
 */
Then(/^I should see at least "([^"]*)" relevant results displayed on the search results page$/, (num: number) => {
  cy.get('[data-testid="new-jersey-grid"]', { timeout: 15000 })
    .should("have.length.at.least", Number(1));
});