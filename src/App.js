import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home/index.page";
import SignIn from "./pages/User/SignIn/index.page";
import Dashboard from "./pages/User/Dashboard/index.page";
import SendMailToStudent from "./pages/User/SendMailToStudent/index.page";
import SendMail from "./pages/User/SendMail/index.page";
import SignUp from "./pages/User/SignUp/index.page";
import ProtectedRoute from "./Components/ProtectedRoute/index.page";
import { appRoutes } from "./pages/User/Routes/appRoutes";
// import AuthContext from "./context/AuthContext";
// import { useContext } from "react";

function App() {
  // const { user } = useContext(AuthContext); // Get user from context

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={appRoutes.home} element={<Home />} />
      <Route path={appRoutes.signIn} element={<SignIn />} />
      <Route path={appRoutes.signUp} element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path={appRoutes.dashboard}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={appRoutes.sendMailToStudent}
        element={
          <ProtectedRoute>
            <SendMailToStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path={appRoutes.mail}
        element={
          <ProtectedRoute>
            <SendMail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
