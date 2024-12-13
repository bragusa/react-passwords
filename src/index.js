"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const OuterApp_1 = __importDefault(require("./OuterApp"));
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(
// <React.StrictMode>
react_1.default.createElement(OuterApp_1.default, null)
// </React.StrictMode>
);
