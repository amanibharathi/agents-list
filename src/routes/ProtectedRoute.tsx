import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedLayout = () => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
