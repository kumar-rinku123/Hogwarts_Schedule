import { TEACHER_HIERARCHY } from "../constants/teachers";

export const getAvailableTeacher = (attendance, allocatedTeacher) => {
  const teacherIndex = TEACHER_HIERARCHY.indexOf(allocatedTeacher);

  for (let i = teacherIndex; i < TEACHER_HIERARCHY.length; i++) {
    const teacher = TEACHER_HIERARCHY[i];
    if (attendance[teacher] === "Present") {
      return teacher;
    }
  }

  return "Not Assigned";
};

export const getTeacherForStudent = (attendance, student, schedule) => {
  const studentSchedule = schedule.find((entry) => entry.student === student);
  const allocatedTeacher = studentSchedule.teacher;

  if (!allocatedTeacher) {
    return getAvailableTeacher(attendance, "Rubeus Hagrid");
  }

  if (attendance[allocatedTeacher] === "Present") {
    return allocatedTeacher;
  }

  return getAvailableTeacher(attendance, allocatedTeacher);
};
