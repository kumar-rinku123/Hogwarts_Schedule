// tests/stepDefinitions/studyClassSteps.cjs

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// Mock data
let attendance = {
  "Professor Dumbledore": "Present",
  "Minerva McGonagall": "Present",
  "Rubeus Hagrid": "Present",
  "Horace Slughorn": "Present",
  "Severus Snape": "Present",
};

let schedule = [
  { student: "Harry Potter", subject: "Potions Master", teacher: "Horace Slughorn" },
  { student: "Hermione Granger", subject: "Potions Master", teacher: "" },
  { student: "Ron Weasley", subject: "Potions Master", teacher: "Severus Snape" },
  { student: "Draco Malfoy", subject: "Potions Master", teacher: "Horace Slughorn" },
  { student: "Padma Patil", subject: "Potions Master", teacher: "" },
  { student: "Luna Lovegood", subject: "Potions Master", teacher: "Severus Snape" },
];

// Mock function to get the teacher for a student
const getTeacherForStudent = (student) => {
  const studentSchedule = schedule.find(entry => entry.student === student);
  const allocatedTeacher = studentSchedule.teacher;

  if (!allocatedTeacher) {
    return "Rubeus Hagrid"; // Default teacher if not assigned
  }

  if (attendance[allocatedTeacher] === "Present") {
    return allocatedTeacher;
  }

  // If the teacher is absent, return the next available teacher
  return "Minerva McGonagall";
};

// Step Definitions

Given('the following teachers\' attendance:', function (dataTable) {
  // Assign the attendance data to the mock attendance object
  dataTable.hashes().forEach((row) => {
    attendance[row.Teacher] = row.Status;
  });
});

Given('the following students\' schedule:', function (dataTable) {
  // Assign the schedule data to the mock schedule object
  schedule = dataTable.hashes();
});

When('I change {string} attendance to {string}', function (teacher, status) {
  // Update the teacher's attendance status
  attendance[teacher] = status;
});

When('I view the schedule for {string}', function (student) {
  // Find the teacher assigned to the student in the schedule
  this.studentSchedule = getTeacherForStudent(student);
});

Then('{string} should be marked as {string} in the attendance table', function (teacher, status) {
  // Assert that the teacher's attendance matches the expected status
  assert.strictEqual(attendance[teacher], status);
});

Then('the schedule for {string} should update to the next available teacher who is {string}', function (student, teacher) {
  // Assert that the schedule for the student updates to the next available teacher
  const studentSchedule = schedule.find(entry => entry.student === student);
  assert.strictEqual(studentSchedule.teacher, teacher);
});

Then('{string} should be assigned to {string} as the new teacher for {string}', function (student, teacher, subject) {
  // Find the student's schedule entry and assert the teacher
  const studentSchedule = schedule.find(entry => entry.student === student);
  assert.strictEqual(studentSchedule.teacher, teacher);
});
