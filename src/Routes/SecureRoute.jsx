import React from "react";
import { Navigate } from "react-router";
import { useContext } from "react";
import useAuth from "../Hooks/useAuth";
import { StateManagementContext } from "../Contexts/StateContext";

const SecureRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { setIsLoginModalOpen } = useContext(StateManagementContext);

  if (!isLoggedIn) {
    setIsLoginModalOpen(true);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SecureRoute;
