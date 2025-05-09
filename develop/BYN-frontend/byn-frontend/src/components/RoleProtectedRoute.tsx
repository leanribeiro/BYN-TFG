import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

interface Props {
  allowedRoles: string[]; 
  redirectTo?: string;
}

const RoleProtectedRoute = ({ allowedRoles, redirectTo = '/dashboard' }: Props) => {
  const { roles, token } = useAuthStore();

  const hasAccess = token && roles.some((role) => allowedRoles.includes(role));

  return hasAccess ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default RoleProtectedRoute;
