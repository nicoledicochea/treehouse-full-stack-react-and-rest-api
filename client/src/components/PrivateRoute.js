import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  if (authUser) {
    // allow authUser to continue to protected route
    return <Outlet />;
  } else {
    // if not authorized redirect user to signin
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }
};

export default PrivateRoute;
