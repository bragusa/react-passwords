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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AuthContext_1 = require("../AuthContext");
const react_router_dom_1 = require("react-router-dom");
const DatabaseAdapter_1 = __importDefault(require("../../Data/DatabaseAdapter"));
require("./Login.scss");
const Wait_1 = __importDefault(require("../../Components/Wait/Wait"));
const eye_password_show_svg_1 = __importDefault(require("../../Resources/Images/eye-password-show.svg"));
const eye_password_hide_svg_1 = __importDefault(require("../../Resources/Images/eye-password-hide.svg"));
const Context_1 = __importDefault(require("../../Data/Context"));
const Strings_1 = __importDefault(require("../../Resources/Strings"));
const OuterApp_1 = require("../../OuterApp");
const Login = ({ setAuth }) => {
    const { setAppName } = (0, OuterApp_1.useAppContext)();
    const { setIsAuthorized } = (0, AuthContext_1.useAuth)();
    const [formData, setFormData] = (0, react_1.useState)({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const loginForm = (0, react_1.useRef)(null);
    const navigate = (0, react_router_dom_1.useNavigate)(); // Hook for navigation
    const dbAdapter = (0, DatabaseAdapter_1.default)();
    const [working, setWorking] = (0, react_1.useState)(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const navigateToApp = (expiration) => {
        setIsAuthorized(true); // Save auth data to context
        if (expiration) {
            sessionStorage.setItem('session_timeout', expiration + '');
        }
        navigate('/');
    };
    const checkForCookie = () => __awaiter(void 0, void 0, void 0, function* () {
        setWorking(true);
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield dbAdapter.checkForCookie();
            if (auth.status === 'success') {
                navigateToApp(null);
                return;
            }
            setWorking(false);
            if (loginForm.current) {
                loginForm.current.style.opacity = '1';
            }
        }), 500);
    });
    (0, react_1.useEffect)(() => {
        checkForCookie();
        fetch('/secure/manifest.json')
            .then((response) => response.json())
            .then((data) => { setAppName(data.short_name); })
            .catch((error) => console.error('Error fetching manifest:', error));
    }, []);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { username, password } = formData;
        if (!username || !password) {
            //setErrorMessage('Both fields are required.');
            return;
        }
        const auth = yield dbAdapter.authenticateUser(username, password);
        if (auth.status === 'failed') {
            setErrorMessage('Invalid username or password.');
            return;
        }
        navigateToApp(auth.expires);
    });
    const appContext = (0, react_1.useContext)(Context_1.default);
    const protocol = window.location.protocol;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'Login-background' }),
        react_1.default.createElement("div", { className: 'Login', ref: loginForm }, protocol === 'http:' ? react_1.default.createElement("h2", null, Strings_1.default.get('https_require')) : react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h2", null,
                "Welcome to ", appContext === null || appContext === void 0 ? void 0 :
                appContext.appName),
            react_1.default.createElement("h4", { className: 'Login-heading' }, Strings_1.default.get('enter_your_credentials')),
            react_1.default.createElement("form", { onSubmit: handleSubmit },
                react_1.default.createElement("input", { type: 'text', name: 'username', placeholder: 'Username', value: formData.username, onChange: handleChange, autoCapitalize: 'off', autoComplete: 'username', maxLength: 12 }),
                react_1.default.createElement("div", { className: 'Login-password' },
                    react_1.default.createElement("input", { type: showPassword ? 'text' : 'password', name: 'password', placeholder: 'Password', value: formData.password, onChange: handleChange, maxLength: 12 }),
                    react_1.default.createElement("button", { style: { visibility: 'hidden', height: '1px' }, type: 'submit' }, "Login"),
                    react_1.default.createElement("button", { className: 'Eye', onClick: (evt) => { evt.preventDefault(); setShowPassword(prev => !prev); } },
                        react_1.default.createElement("img", { alt: Strings_1.default.get('show_password'), src: showPassword ? eye_password_hide_svg_1.default : eye_password_show_svg_1.default }))),
                react_1.default.createElement("button", { style: { float: 'left' }, type: 'submit' }, Strings_1.default.get('sign_in'))))),
        errorMessage && react_1.default.createElement("p", { className: 'Error' }, errorMessage),
        react_1.default.createElement(Wait_1.default, { spinner: true, active: working })));
};
exports.default = Login;
