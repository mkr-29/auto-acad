import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home/index.page";
import SignIn from "./pages/User/SignIn/index.page";
import Dashboard from "./pages/User/Dashboard/index.page";
import SendMailToStudent from "./pages/User/SendMailToStudent/index.page";
import SendMail from "./pages/User/SendMail/index.page";
// import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/send-mail-to-student" element={<SendMailToStudent />} />
        <Route path="/user/mail" element={<SendMail />} />
        {/* Private Routes */}
        {/* <Route path="/user" element={<PrivateRoutes/>}>
          <Route path="dashboard" element={<Dashboard/>} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
