import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard.jsx";
import Login from "./modules/auth/Login.jsx";
import { useAuth } from "./modules/auth/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <Routes>
    <Route
      path="/*"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default App;

