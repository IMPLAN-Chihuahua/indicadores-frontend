import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children;
}

const PublicRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }
  return children;
}

export { PrivateRoute, PublicRoute };