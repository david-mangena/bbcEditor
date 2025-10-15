Feature: Validation In A Table Of Results
    As a BBC Editor, I want to acuratly report the results of the 2023 Las Vegas Grand Prix,
    where Max Verstappen took 1st place, George Russell took 2nd place, and Sergio Perez took 3rd place, so that my
    audience is well informed about the key highlights of the race.

    Background:
        Given I am logged to the BBC home page

    Scenario: Scenario Outline name: Validation In A Table Of Results
    And I navigate to the "Formula 1" section
    When I click on "Results" and selecet the year "2023"
    Then I should see a table with the top "3" finishers of the Las Vegas Grand Prix
    And the table should contain the following data:
        | Position | Driver          | Team    |
        | 1        | Max Verstappen  | Red Bull|
        | 2        | Charles Leclerc | Ferrari |
        | 3        | Sergio Perez    | Red Bull|

    Scenario: Scenario Outline name: Retreive Search Results
    When I use the search function to look for "Sports in 2023"
    Then I should see at least "4" relevant results displayed on the search results page
    