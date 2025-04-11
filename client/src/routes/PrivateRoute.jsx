import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>; // optional loading UI
//   }
if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
      </div>
    );
  }
  
//   return isAuthenticated ? children : <Navigate to="/" replace />;
return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
