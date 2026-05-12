import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../app/router/constants";
import Loader from "../../../components/common/Loader";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout().finally(() => navigate(ROUTES.HOME, { replace: true }));
  }, [logout, navigate]);

  return <Loader />;
}

export default Logout;
