import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    return (_jsx(AuthContext.Provider, { value: { isAuthorized, setIsAuthorized }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
