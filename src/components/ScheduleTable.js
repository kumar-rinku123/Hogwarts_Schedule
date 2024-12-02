import React from "react";

const ScheduleTable = ({ schedule, getTeacherForStudent }) => (
  <div className="schedule">
    <h2>Current Schedule</h2>
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Subject</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((entry) => (
          <tr key={entry.student}>
            <td>{entry.student}</td>
            <td>{entry.subject}</td>
            <td className={getTeacherForStudent(entry.student) === "Not Assigned" ? "not-assigned-teacher" : ""}>{getTeacherForStudent(entry.student)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ScheduleTable;
