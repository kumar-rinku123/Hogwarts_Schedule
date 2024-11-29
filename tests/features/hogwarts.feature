# features/studyClass.feature

Feature: Study Class Attendance

  Background:
    Given the following teachers' attendance:
      | Teacher              | Status  |
      | Professor Dumbledore  | Present |
      | Minerva McGonagall    | Present |
      | Rubeus Hagrid         | Present |
      | Horace Slughorn       | Present |
      | Severus Snape         | Present |

    And the following students' schedule:
      | Student         | Subject        | Teacher          |
      | Harry Potter    | Potions Master | Horace Slughorn  |
      | Hermione Granger| Potions Master |                  |
      | Ron Weasley     | Potions Master | Severus Snape    |
      | Draco Malfoy    | Potions Master | Horace Slughorn  |
      | Padma Patil     | Potions Master |                  |
      | Luna Lovegood   | Potions Master | Severus Snape    |

  Scenario: Teacher Attendance Change
    When I change "Professor Dumbledore" attendance to "Absent"
    Then "Professor Dumbledore" should be marked as "Absent" in the attendance table
    And the schedule for "Harry Potter" should update to the next available teacher who is "Minerva McGonagall"

  Scenario: Assigning Teacher when Teacher is Absent
    Given "Professor Dumbledore" is "Absent"
    When I view the schedule for "Harry Potter"
    Then "Harry Potter" should be assigned to "Minerva McGonagall" as the new teacher for Potions Master
