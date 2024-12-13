"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute_1 = __importDefault(require("./ProtectedRoute"));
const AuthContext_1 = require("./Security/AuthContext");
const Login_1 = __importDefault(require("./Security/Login/Login"));
const App_1 = __importDefault(require("./App"));
const Context_1 = __importDefault(require("./Data/Context"));
const OuterApp = () => {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = (0, react_1.useState)(null);
    const [manifest, setManifest] = (0, react_1.useState)({ appName: '' });
    (0, react_1.useEffect)(() => {
        // Listen for visibility change events
        const handleVisibilityChange = () => {
            const channel = new BroadcastChannel('app-channel');
            channel.postMessage({ type: 'APP_ACTIVE' });
            channel.close(); // Close the channel after sending the message 
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        fetch('/secure/manifest.json')
            .then((response) => response.json())
            .then((data) => { setManifest({ appName: data.short_name }); })
            .catch((error) => console.error('Error fetching manifest:', error));
        // Cleanup listener on component unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    return (react_1.default.createElement(Context_1.default.Provider, { value: manifest },
        react_1.default.createElement(AuthContext_1.AuthProvider, null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(Login_1.default, { setAuth: setAuth }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(ProtectedRoute_1.default, null,
                        react_1.default.createElement(App_1.default, null)) })))));
};
// Wrap the `OuterApp` with `Router`
const AppWrapper = () => (react_1.default.createElement(react_router_dom_1.BrowserRouter, { basename: "/secure" },
    react_1.default.createElement(OuterApp, null)));
exports.default = AppWrapper;
