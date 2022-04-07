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
  const from = location.state?.from?.pathname || '/';
  if (auth.user) {
    return <Navigate to={from} replace />
  }
  return children;
}

export { PrivateRoute, PublicRoute };