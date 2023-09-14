import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { config } from "../../config/config";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [cookies] = useCookies([config.TOKEN_COOKIE]);
  const token = cookies[config.TOKEN_COOKIE];
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
