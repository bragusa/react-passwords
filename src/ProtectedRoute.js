import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
const ProtectedRoute = ({ children }) => {
    const authContext = useAuth();
    if (!authContext.isAuthorized) {
        return _jsx(Navigate, { to: "/login" });
    }
    return _jsxs(_Fragment, { children: [children, " "] });
};
export default ProtectedRoute;
