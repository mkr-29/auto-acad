import Home from "../pages/User/Home/index.page";
import SignIn from "../pages/User/SignIn/index.page";
import SignUp from "../pages/User/SignUp/index.page";
import { appRoutes } from "./appRoutes";
import AuthRedirect from "../Components/AuthRedirect/index.page";

const publicRoutes = [
  {
    path: appRoutes.home,
    element: <Home />,
  },
  {
    path: appRoutes.signIn,
    element: (
      <AuthRedirect>
        <SignIn />
      </AuthRedirect>
    ),
  },
  {
    path: appRoutes.signUp,
    element: (
      <AuthRedirect>
        <SignUp />
      </AuthRedirect>
    ),
  },
];

export default publicRoutes;
