import Home from "../pages/User/Home/index.page";
import SignIn from "../pages/User/SignIn/index.page";
import SignUp from "../pages/User/SignUp/index.page";
import { appRoutes } from "./appRoutes";

const publicRoutes = [
  {
    path: appRoutes.home,
    element: <Home />,
  },
  {
    path: appRoutes.signIn,
    element: <SignIn />,
  },
  {
    path: appRoutes.signUp,
    element: <SignUp />,
  },
];

export default publicRoutes;
