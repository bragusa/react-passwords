"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Wait.scss");
const react_1 = __importDefault(require("react"));
const Wait = ({ active, spinner, relative, transparent }) => {
    return (active ?
        react_1.default.createElement("div", { "data-transparent": transparent, className: `Wait-underlay${relative ? ' Wait-relative' : ''}` }, spinner ? react_1.default.createElement("div", { className: "Wait-spinner" }) : null)
        : null);
};
exports.default = Wait;
