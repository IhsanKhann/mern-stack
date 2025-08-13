// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  if(token){
    return children;
  }

  // If no token, redirect to login and preserve the attempted path in state
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

}
