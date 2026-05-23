import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  /*
  Check login
  */
  const userInfo = localStorage.getItem("userInfo");

  /*
  Redirect if not logged in
  */
  if (!userInfo) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;