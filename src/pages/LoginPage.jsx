import { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/notes", { replace: true });
    }
  }, [isAuthenticated]);

  return <div>Login</div>;
};

export default LoginPage;
