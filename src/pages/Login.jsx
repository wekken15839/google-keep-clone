import { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/notes", { replace: true });
    }
  }, [isAuthenticated]);

  return <div>Login</div>;
}
