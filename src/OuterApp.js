import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./Security/AuthContext";
import Login from "./Security/Login/Login";
import App from "./App";
import AppContext from './Data/Context';
import './OuterApp.scss';
// Custom hook to use AppContext in any component
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
const OuterApp = () => {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useState(null);
    //const [manifest, setManifest] = useState({appName: ''});
    const [userData, setUserData] = useState({ username: null, name: null });
    const [appName, setAppName] = useState('');
    useEffect(() => {
        // Listen for visibility change events
        const handleVisibilityChange = () => {
            const channel = new BroadcastChannel('app-channel');
            channel.postMessage({ type: 'APP_ACTIVE' });
            channel.close(); // Close the channel after sending the message 
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        // Cleanup listener on component unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    return (_jsx(AppContext.Provider, { value: { appName, userData, setAppName, setUserData }, children: _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, { setAuth: setAuth }) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(App, {}) }) })] }) }) }));
};
// Wrap the `OuterApp` with `Router`
const AppWrapper = () => (_jsx(Router, { basename: "/starterpwa", children: _jsx(OuterApp, {}) }));
export default AppWrapper;
