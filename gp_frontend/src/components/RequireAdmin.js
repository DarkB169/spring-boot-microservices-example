import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const RequireAdmin = ({ children }) => {
    return isAdmin() ? children : <Navigate to="/unauthorized" />;
};

export default RequireAdmin;
