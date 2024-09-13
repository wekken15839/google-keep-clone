import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import NavBar from "./SideBar/SideBar";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to={"/login"} />;
}
