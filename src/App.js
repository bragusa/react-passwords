import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './App.scss';
import Wait from './Components/Wait/Wait';
import DBAdapter from './Data/DatabaseAdapter';
import signout from './Resources/Images/signout.png';
import { useAppContext } from './OuterApp';
import { FadeInFromRight } from './Motion/PageNavigation';
function App() {
    const [working, setWorking] = useState(false);
    const dbAdapter = DBAdapter();
    const { userData, appName, setUserData } = useAppContext();
    useEffect(() => {
        //subtract 60000 - 1 minute
        const checkforTimeout = async () => {
            const timeout = sessionStorage.getItem('session_timeout');
            if (timeout) {
                const now = new Date().getTime();
                if (now > parseInt(timeout) - 60000) { //within 1 minute of logout
                    sessionStorage.removeItem('session_timeout');
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    const logout = await dbAdapter.logout();
                    if (logout.status === 'success') {
                        window.location.reload();
                        return;
                    }
                    setWorking(false);
                }
            }
            setTimeout(checkforTimeout, 30000); // 5 minutes
        };
        const fetchData = async () => {
            try {
                checkforTimeout();
                const userData = await dbAdapter.fetchData('users', '');
                setUserData(userData[0]);
                setWorking(false);
            }
            catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.dir(userData);
        // we now have a valid user. kick off additional data loads
    }, [userData]);
    return _jsxs(FadeInFromRight, { children: [_jsxs("div", { className: "App", children: [_jsxs("header", { className: "App-header", children: [_jsxs("h3", { children: [appName, " ", _jsxs("small", { style: { fontSize: '50%' }, children: ["- ", userData === null || userData === void 0 ? void 0 : userData.name] })] }), _jsx("button", { className: 'SignOut', onClick: async () => {
                                    setWorking(true);
                                    setTimeout(async () => {
                                        const logout = await dbAdapter.logout();
                                        if (logout.status === 'success') {
                                            window.location.reload();
                                            return;
                                        }
                                        setWorking(false);
                                    }, 100);
                                }, children: _jsx("img", { alt: 'Sign Out', src: signout }) })] }), _jsx("div", { className: "App-body", children: "This is where you should start to add your custom application code. Add new components and pages to the src folder and start in App.tsx." })] }), _jsx(Wait, { spinner: true, active: working })] });
}
export default App;
