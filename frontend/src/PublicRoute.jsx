import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export { PublicRoute };

function PublicRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/feed" />;
  }

  return children;
}
