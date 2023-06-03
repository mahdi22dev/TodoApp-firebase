import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/Todo_context";

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default ProtectedRoute;
