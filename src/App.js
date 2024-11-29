import React, { useState } from "react";
import { TEACHERS } from "./constants/teachers";
import { INITIAL_SCHEDULE } from "./constants/schedule";
import { handleAttendanceChange } from "./utils/attendanceUtils";
import { getTeacherForStudent } from "./utils/teacherUtils";
import AttendanceTable from "./components/AttendanceTable";
import ScheduleTable from "./components/ScheduleTable";
import "./App.css";

const App = () => {
  const [attendance, setAttendance] = useState(TEACHERS);
  const [schedule] = useState(INITIAL_SCHEDULE);

  const onAttendanceChange = (teacher, value) => {
    setAttendance(handleAttendanceChange(attendance, teacher, value));
  };

  return (
    <div className="App">
      <h1 className="Schedule-test">Schedule Today</h1>
      <div className="container">
        <AttendanceTable
          attendance={attendance}
          onAttendanceChange={onAttendanceChange}
        />
        <ScheduleTable
          schedule={schedule}
          getTeacherForStudent={(student) =>
            getTeacherForStudent(attendance, student, schedule)
          }
        />
      </div>
    </div>
  );
};

export default App;
