import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import DBAdapter from '../../Data/DatabaseAdapter';
import './Login.scss';
import Wait from '../../Components/Wait/Wait';
import EyeShow from '../../Resources/Images/eye-password-show.svg';
import EyeHide from '../../Resources/Images/eye-password-hide.svg';
import AppContext from '../../Data/Context';
import Strings from '../../Resources/Strings';
import { useAppContext } from '../../OuterApp';
import { FadeInFromLeft } from '../../Motion/PageNavigation';
const Login = ({ setAuth }) => {
    const { setAppName } = useAppContext();
    const { setIsAuthorized } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const loginForm = useRef(null);
    const navigate = useNavigate(); // Hook for navigation
    const dbAdapter = DBAdapter();
    const [working, setWorking] = useState(false);
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
    const checkForCookie = async () => {
        setWorking(true);
        setTimeout(async () => {
            const auth = await dbAdapter.checkForCookie();
            if (auth.status === 'success') {
                navigateToApp(null);
                return;
            }
            setWorking(false);
            if (loginForm.current) {
                loginForm.current.style.opacity = '1';
            }
        }, 500);
    };
    useEffect(() => {
        checkForCookie();
        fetch('/secure/manifest.json')
            .then((response) => response.json())
            .then((data) => { setAppName(data.short_name); })
            .catch((error) => console.error('Error fetching manifest:', error));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setWorking(true);
        const { username, password } = formData;
        if (!username || !password) {
            setWorking(false);
            //setErrorMessage('Both fields are required.');
            return;
        }
        const auth = await dbAdapter.authenticateUser(username, password);
        if (auth.status === 'failed') {
            setErrorMessage('Invalid username or password.');
            setWorking(false);
            return;
        }
        if (auth.status === 'success') {
            navigateToApp(auth.expires);
            setWorking(false);
            return;
        }
        setWorking(false);
        setErrorMessage('Error: could not authenticate.');
    };
    const appContext = useContext(AppContext);
    const protocol = window.location.protocol;
    return (_jsxs(FadeInFromLeft, { children: [_jsx("div", { className: 'Login-background' }), _jsx("div", { className: 'Login', ref: loginForm, children: protocol === 'http:' ? _jsx("h2", { children: Strings.get('https_require') }) : _jsxs(_Fragment, { children: [_jsxs("h2", { children: ["Welcome to ", appContext === null || appContext === void 0 ? void 0 : appContext.appName] }), _jsx("h4", { className: 'Login-heading', children: Strings.get('enter_your_credentials') }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: 'text', name: 'username', placeholder: 'Username', value: formData.username, onChange: handleChange, autoCapitalize: 'off', autoComplete: 'username', maxLength: 12 }), _jsxs("div", { className: 'Login-password', children: [_jsx("input", { type: showPassword ? 'text' : 'password', name: 'password', placeholder: 'Password', value: formData.password, onChange: handleChange, maxLength: 12 }), _jsx("button", { style: { visibility: 'hidden', height: '1px' }, type: 'submit', children: "Login" }), _jsx("button", { className: 'Eye', onClick: (evt) => { evt.preventDefault(); setShowPassword(prev => !prev); }, children: _jsx("img", { alt: Strings.get('show_password'), src: showPassword ? EyeHide : EyeShow }) })] }), _jsx("button", { style: { float: 'left' }, type: 'submit', children: Strings.get('sign_in') })] })] }) }), errorMessage && _jsx("p", { className: 'Error', children: errorMessage }), _jsx(Wait, { spinner: true, active: working })] }));
};
export default Login;
