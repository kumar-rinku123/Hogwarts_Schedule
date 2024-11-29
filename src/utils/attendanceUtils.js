export const handleAttendanceChange = (attendance, teacher, value) => {
  return { ...attendance, [teacher]: value };
};
