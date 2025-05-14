

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
  mail: (templateId, mode) => {
    return `/user/mail/${mode}/${templateId}`;
  },
  viewStudents: "/user/view-students",
  enterMarksManually: "/user/enter-student-marks-manual",
  enterMarksUsingCsv: "/user/enter-student-marks-csv",
  addEmailTemplate: "/user/add-email-template",
  sendMail: "/user/send-mail",
}

export { appRoutes, userRoutes };