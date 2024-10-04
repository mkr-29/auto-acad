import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/User/Home/index.page";
import SignIn from "./pages/User/SignIn/index.page";
import Dashboard from "./pages/User/Dashboard/index.page";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        {/* Private Routes */}
        {/* <Route path="/dashboard" element={<PrivateRoute component={PrivateComponent} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
