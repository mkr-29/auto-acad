import Dashboard from "../pages/User/Dashboard/index.page";
import SendMailToStudent from "../pages/User/SendMailToStudent/index.page";
import SendMail from "../pages/User/SendMail/index.page";
import { appRoutes } from "./appRoutes";

const protectedRoutes = [
  {
    path: appRoutes.dashboard,
    element: <Dashboard />,
  },
  {
    path: appRoutes.sendMailToStudent,
    element: <SendMailToStudent />,
  },
  {
    path: appRoutes.mail,
    element: <SendMail />,
  },
];

export default protectedRoutes;
