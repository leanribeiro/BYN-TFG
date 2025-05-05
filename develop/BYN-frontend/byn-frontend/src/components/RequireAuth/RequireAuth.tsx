import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const RequireAuth = () => {
  const { user } = useAuthStore();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
