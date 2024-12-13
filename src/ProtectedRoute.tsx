import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useAuth();

  if (!authContext.isAuthorized) {
    return <Navigate to="/login" />;
  }

  return <>{children} </>;
};

export default ProtectedRoute;