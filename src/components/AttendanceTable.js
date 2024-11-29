import React from "react";

const AttendanceTable = ({ attendance, onAttendanceChange }) => (
  <div className="attendance">
    <h2>Attendance</h2>
    <table>
      <thead>
        <tr>
          <th>Teacher</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(attendance).map((teacher) => (
          <tr key={teacher}>
            <td>{teacher}</td>
            <td>
              <select
                value={attendance[teacher]}
                onChange={(e) => onAttendanceChange(teacher, e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AttendanceTable;
