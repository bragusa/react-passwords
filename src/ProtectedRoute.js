"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("./Security/AuthContext");
const ProtectedRoute = ({ children }) => {
    const authContext = (0, AuthContext_1.useAuth)();
    if (!authContext.isAuthorized) {
        return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/login" });
    }
    return react_1.default.createElement(react_1.default.Fragment, null,
        children,
        " ");
};
exports.default = ProtectedRoute;
