


import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (!["admin", "super_admin"].includes(decoded.role)) {
      return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
  } catch (err) {
    localStorage.clear();
    return <Navigate to="/" />;
  }
}