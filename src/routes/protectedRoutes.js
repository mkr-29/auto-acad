import Dashboard from "../pages/User/Dashboard/index.page";
import SendMailToStudent from "../pages/User/SendMailToStudent/index.page";
import SendMail from "../pages/User/SendMail/index.page";
import EnterStudentMarks from "../pages/User/Dashboard/EnterStudentMarks/index.page";
import EnterMarksManually from "../pages/User/Dashboard/EnterStudentMarks/EnterMarksManually/index.page";
import { appRoutes, userRoutes } from "./appRoutes";
import AddStudentToMentor from "../pages/User/Dashboard/AddStudentToMentor/index.page";

const protectedRoutes = [
  {
    path: appRoutes.dashboard,
    element: <Dashboard />,
  },
  {
    path: userRoutes.enterStudentMarks,
    element: (
      <Dashboard>
        <EnterStudentMarks />
      </Dashboard>
    )
  },
  {
    path: userRoutes.sendMailToStudent,
    element: <SendMailToStudent />,
  },
  {
    path: userRoutes.mail,
    element: <SendMail />,
  },
  {
    path: userRoutes.viewStudentDetails,
    element: (
      <Dashboard>
        <viewStudentDetails />
      </Dashboard>
    )
  },
  {
    path: userRoutes.enterMarksManually,
    element: (
      <Dashboard>
        <EnterMarksManually />
      </Dashboard>
    )
  },
  {
    path: userRoutes.addStudentToMentor,
    element: (
      <Dashboard>
        <AddStudentToMentor />
      </Dashboard>
    )
  }
];

export default protectedRoutes;
