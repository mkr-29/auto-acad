import "./App.css";
import { Route, Routes } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import ProtectedRoute from "./Components/ProtectedRoute/index.page";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* Render Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Render Protected Routes */}
        {protectedRoutes.map(({ path, element, id }) => (
          <Route
            key={path + id}
            path={path}
            element={
              <ProtectedRoute key={id || `protected-${path}`}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        // draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
