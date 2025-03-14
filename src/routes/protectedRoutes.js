import Dashboard from "../pages/User/Dashboard/index.page";
import SendMail from "../pages/User/Dashboard/SendMail/index.page";
import EnterStudentMarks from "../pages/User/Dashboard/EnterStudentMarks/index.page";
import EnterMarksManually from "../pages/User/Dashboard/EnterStudentMarks/EnterMarksManually/index.page";
import { appRoutes, userRoutes } from "./appRoutes";
import AddStudentToMentor from "../pages/User/Dashboard/AddStudentToMentor/index.page";
import SendMailToStudent from "../pages/User/Dashboard/SendMailToStudent/index.page";

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
    ),
  },
  {
    path: userRoutes.sendMailToStudent,
    element: (
      <Dashboard>
        <SendMailToStudent />
      </Dashboard>
    ),
  },
  {
    path: userRoutes.viewStudentDetails,
    element: (
      <Dashboard>
        <viewStudentDetails />
      </Dashboard>
    ),
  },
  {
    path: userRoutes.enterMarksManually,
    element: (
      <Dashboard>
        <EnterMarksManually />
      </Dashboard>
    ),
  },
  {
    path: userRoutes.addStudentToMentor,
    element: (
      <Dashboard>
        <AddStudentToMentor />
      </Dashboard>
    ),
  },
  {
    path: userRoutes.mail,
    element: (
      <Dashboard>
        <SendMail />
      </Dashboard>
    ),
  },
];

export default protectedRoutes;
