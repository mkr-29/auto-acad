import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/User/Home/index.page";
import SignIn from "./pages/User/SignIn/index.page";
import Dashboard from "./pages/User/Dashboard/index.page";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        {/* Private Routes */}
        {/* <Route path="/user" element={<PrivateRoutes/>}>
          <Route path="dashboard" element={<Dashboard/>} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
