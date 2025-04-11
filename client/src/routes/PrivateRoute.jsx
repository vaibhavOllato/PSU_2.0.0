import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // optional loading UI
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
