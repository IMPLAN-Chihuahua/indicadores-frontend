import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isAdmin } from "../utils/userValidator";

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

const AdminRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    isAdmin(user) ?
      <Outlet />
      :
      <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export { PrivateRoute, PublicRoute, AdminRoute };