import "./App.css";
import { Route, Routes } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import ProtectedRoute from "./Components/ProtectedRoute/index.page";

function App() {
  return (
    <Routes>
      {/* Render Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Render Protected Routes */}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}
    </Routes>
  );
}

export default App;
