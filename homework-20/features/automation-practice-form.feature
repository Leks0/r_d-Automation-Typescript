Feature: Automation Practice Form Cucumber.js autotests

  Background:
    Given the user opens the Automation Practice Form page

  Scenario: User submits the Practice Form with all fields
    When the user fills in the Practice Form with:
      | firstName | Olena                          |
      | lastName  | Petrenko                       |
      | email     | o.petrenko@mailto.plus         |
      | mobile    | 0679862121                     |
      | gender    | Female                         |
      | hobbies   | Music, Reading                 |
      | birthDate | 15 Mar 1990                    |
      | subjects  | Maths, Physics                 |
      | state     | Haryana                        |
      | city      | Panipat                        |
    And the user submits the Practice Form
    Then the user is able to see the submission modal
    And  the user No 1 is able to see the submission modal with 'data‑set‑1' table
      | property          | expected               |
      | studentNameCell   | Olena Petrenko         |
      | studentEmailCell  | o.petrenko@mailto.plus |
      | genderCell        | Female                 |
      | mobileCell        | 0679862121             |
      | dateOfBirthCell   | 15 March,1990          |
      | subjectsCell      | Maths, Physics         |
      | hobbiesCell       | Music, Reading         |
      | stateCityCell     | Haryana Panipat        |

  Scenario: User submits the Practice Form with minimal data
    When the user fills in the Practice Form with:
      | firstName | Olha                  |
      | lastName  | Ivanova               |
      | email     | o.ivanova@mailto.plus |
      | mobile    | 0663987650            |
      | gender    | Female                |
      | hobbies   |                       |
      | birthDate | 01 Jan 2000           |
      | subjects  |                       |
      | state     | NCR                   |
      | city      | Delhi                 |
    And the user submits the Practice Form
    Then the user is able to see the submission modal
    And  the user No 2 is able to see the submission modal with 'data‑set‑2' table
      | property          | expected               |
      | studentNameCell   | Olha Ivanova           |
      | studentEmailCell  | o.ivanova@mailto.plus  |
      | genderCell        | Female                 |
      | mobileCell        | 0663987650            |
      | dateOfBirthCell   | 01 January,2000        |
      | subjectsCell      |                        |
      | hobbiesCell       |                        |
      | stateCityCell     | NCR Delhi              |

  Scenario: User submits the Practice Form with alternative full data
    When the user fills in the Practice Form with:
      | firstName | Alex                   |
      | lastName  | Ivanov                 |
      | email     | a.ivanov@mailto.plus   |
      | mobile    | 0990675454            |
      | gender    | Male                   |
      | hobbies   | Sports                 |
      | birthDate | 05 May 1985            |
      | subjects  | Chemistry              |
      | state     | Uttar Pradesh          |
      | city      | Agra                   |
    And the user submits the Practice Form
    Then the user is able to see the submission modal
    And  the user No 3 is able to see the submission modal with 'data‑set‑3' table
      | property          | expected                 |
      | studentNameCell   | Alex Ivanov              |
      | studentEmailCell  | a.ivanov@mailto.plus     |
      | genderCell        | Male                     |
      | mobileCell        | 0990675454              |
      | dateOfBirthCell   | 05 May,1985              |
      | subjectsCell      | Chemistry                |
      | hobbiesCell       | Sports                   |
      | stateCityCell     | Uttar Pradesh Agra       |
