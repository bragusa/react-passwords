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
const Context_1 = __importDefault(require("./Data/Context"));
function App() {
    const [working, setWorking] = (0, react_1.useState)(false);
    const dbAdapter = (0, DatabaseAdapter_1.default)();
    const appContext = (0, react_1.useContext)(Context_1.default);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement("header", { className: "App-header" },
                react_1.default.createElement("h3", null, appContext === null || appContext === void 0 ? void 0 : appContext.appName),
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
            react_1.default.createElement("div", { className: "App-body" })),
        react_1.default.createElement(Wait_1.default, { spinner: true, active: working }));
}
exports.default = App;
