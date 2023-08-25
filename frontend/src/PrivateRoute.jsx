import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export { PrivateRoute };

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
