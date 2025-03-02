const appRoutes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/user/dashboard",
};

const userRoutes = {
  addStudentToMentor: "/user/add-student-to-mentor",
  enterStudentMarks: "/user/enter-student-marks",
  sendMailToStudent: "/user/send-mail-to-student",
  mail: "/user/mail",
  viewStudentDetails: "/user/view-student-details",
  viewBatchDetails: "/user/view-batch-details",
  enterMarksManually: "/user/enter-student-marks-manual",
  enterMarksUsingCsv: "/user/enter-student-marks-csv",
}

export { appRoutes, userRoutes };