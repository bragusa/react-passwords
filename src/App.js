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
require("./App.scss");
const Wait_1 = __importDefault(require("./Components/Wait/Wait"));
const DatabaseAdapter_1 = __importDefault(require("./Data/DatabaseAdapter"));
const signout_png_1 = __importDefault(require("./Resources/Images/signout.png"));
const OuterApp_1 = require("./OuterApp");
function App() {
    const [working, setWorking] = (0, react_1.useState)(false);
    const dbAdapter = (0, DatabaseAdapter_1.default)();
    const { userData, appName, setUserData } = (0, OuterApp_1.useAppContext)();
    (0, react_1.useEffect)(() => {
        //subtract 60000 - 1 minute
        const checkforTimeout = () => __awaiter(this, void 0, void 0, function* () {
            const timeout = sessionStorage.getItem('session_timeout');
            if (timeout) {
                const now = new Date().getTime();
                if (now > parseInt(timeout) - 60000) { //within 1 minute of logout
                    sessionStorage.removeItem('session_timeout');
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    const logout = yield dbAdapter.logout();
                    if (logout.status === 'success') {
                        window.location.reload();
                        return;
                    }
                    setWorking(false);
                }
            }
            setTimeout(checkforTimeout, 30000); // 5 minutes
        });
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                checkforTimeout();
                const userData = yield dbAdapter.fetchData('users', '');
                setUserData(userData[0]);
                setWorking(false);
            }
            catch (error) {
                console.error("Error fetching data", error);
            }
        });
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    (0, react_1.useEffect)(() => {
        console.dir(userData);
        // we now have a valid user. kick off additional data loads
    }, [userData]);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement("header", { className: "App-header" },
                react_1.default.createElement("h3", null,
                    appName,
                    " ",
                    react_1.default.createElement("small", { style: { fontSize: '50%' } },
                        "- ",
                        userData.name)),
                react_1.default.createElement("button", { className: 'SignOut', onClick: () => __awaiter(this, void 0, void 0, function* () {
                        setWorking(true);
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            const logout = yield dbAdapter.logout();
                            if (logout.status === 'success') {
                                window.location.reload();
                                return;
                            }
                            setWorking(false);
                        }), 100);
                    }) },
                    react_1.default.createElement("img", { alt: 'Sign Out', src: signout_png_1.default }))),
            react_1.default.createElement("div", { className: "App-body" }, "This is where you should start to add your custom application code. Add new components and pages to the src folder and start in App.tsx.")),
        react_1.default.createElement(Wait_1.default, { spinner: true, active: working }));
}
exports.default = App;
