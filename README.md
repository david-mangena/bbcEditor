🧪 BBC Sports Cypress E2E Automation Framework

A robust end-to-end (E2E) test automation framework built with Cypress, Cucumber (BDD), TypeScript, and Mochawesome reporting, designed for BBC Sports web application testing.

This framework enables maintainable, readable, and CI/CD-ready automation — integrating behavior-driven development principles with Cypress’s fast and reliable testing engine.

📋 Table of Contents

✨ Features

📁 Project Structure

⚙️ Setup & Installation

🏃 Running Tests

📊 Reporting

🤖 CI/CD Integration

🧩 Utilities & Helpers

📘 Test Scenarios

🧠 Design Principles

🧱 Tech Stack

🧰 Troubleshooting

✨ Features

✅ Cucumber BDD Integration – readable .feature files mapped to step definitions.
✅ TypeScript Support – ensures static type safety and maintainable code.
✅ Custom Cypress Commands – reusable helpers for clicks, typing, and validation.
✅ Mochawesome Reports – rich HTML test results with screenshots.
✅ CI/CD Ready – preconfigured GitHub Actions workflow for automated testing.
✅ Data-Driven Testing – supports Cucumber DataTables for structured test validation.
✅ Error Handling & Logging – robust assertions and fail-safe utilities.

📁 Project Structure
cypress/
 ├── e2e/
 │   ├── bbcEditor/
 │   │   ├── feature/
 │   │   │   └── validation.feature
 │   │   └── steps/
 │   │       └── validation.steps.ts
 │   ├── utils/
 │   │   └── helpers.ts
 ├── fixtures/
 │   └── selectors.json
 ├── reports/
 │   ├── mochawesome.json
 │   └── html/
 ├── support/
 │   ├── commands.ts
 │   ├── e2e.ts
 │   └── utils/
 │       └── helpers.ts
.github/
 └── workflows/
     └── cypress.yml
cypress.config.ts
package.json
README.md

⚙️ Setup & Installation
1. Clone the repository
git clone https://github.com/<your-org>/bbc-cypress-framework.git
cd bbc-cypress-framework

2. Install dependencies
npm ci

3. Verify Cypress installation
npx cypress verify

🏃 Running Tests
Run all feature files (headless mode)
npx cypress run

Run a specific feature file
npx cypress run --spec "cypress/e2e/bbcEditor/feature/validation.feature"

Run tests in Cypress GUI (debug mode)
npx cypress open

📊 Reporting

The framework uses Mochawesome for generating HTML reports.

To merge and generate the report manually:
npx mochawesome-merge cypress/reports/*.json > mochawesome.json
npx marge mochawesome.json --reportDir cypress/reports/html --inline


The final HTML report will be located at:

cypress/reports/html/mochawesome.html


Reports include:

Pass/fail statistics

Stack traces

Screenshots & videos on failure

🤖 CI/CD Integration

The framework includes a ready-to-use GitHub Actions workflow for automated runs on every push or pull request.

Workflow File:

.github/workflows/cypress.yml

Key Features:

Runs Cypress on Ubuntu with Chrome in headless mode.

Installs dependencies using npm ci.

Generates and uploads Mochawesome reports as build artifacts.

Uploads screenshots and videos for failed runs.

Tested against multiple Node.js versions (18, 20).

Run Results:

Available under GitHub Actions → Cypress E2E Tests.

Downloadable artifacts include full HTML reports.

🧩 Utilities & Helpers

Reusable logic lives in cypress/support/utils/helpers.ts.

Example Utility (text cleaner)
export const cleanDriverName = (text: string): string => {
  return text
    .replace(/\s+/g, " ")
    .replace(/([A-Z]{2,3})$/, "")
    .replace(/Red Bull|Ferrari|Mercedes/gi, "")
    .trim();
};


Use it in step definitions to simplify test logic and ensure clean assertions.

📘 Test Scenarios
1️⃣ Validation in Table of Results

Goal: Verify Formula 1 race results for the Las Vegas Grand Prix.
Steps:

Navigate to the BBC Sports Formula 1 section

Click "Results" and select the year 2023

Assert the top 3 finishers in the race table match expected values

2️⃣ Search Results Validation

Goal: Verify the search feature displays relevant content.
Steps:

Click the search icon

Enter search term "Sports in 2023"

Assert at least 4 results are displayed

🧠 Design Principles
Principle	Description
Modularity	Reusable functions and commands across steps
Maintainability	Feature/step separation with readable BDD syntax
Scalability	Supports additional test suites and parallel execution
Robustness	Handles dynamic DOMs, waits, and flaky elements gracefully
CI/CD Ready	Plug-and-play GitHub Actions integration

🧱 Tech Stack
Tool	Purpose
Cypress	Core E2E test framework
Cucumber	BDD-style syntax
TypeScript	Type safety and maintainability
Mochawesome	Advanced reporting
GitHub Actions	Continuous Integration pipeline
ESBuild / Webpack	Efficient test preprocessing

🧰 Troubleshooting
Issue	Possible Fix
"No tests found"	Ensure specPattern is set to "**/*.feature" in cypress.config.ts
Missing step definitions	Check the stepDefinitions path in package.json
"Multiple support files found"	Combine or remove duplicate files under cypress/support/
Captcha blocks automation	Use cy.session() or mock/stub the request layer for pre-authenticated states
