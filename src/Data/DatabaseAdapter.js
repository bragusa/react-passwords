"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const transactionURL = window.location.protocol + '//southshoreweb.com/files/data';
const DBAdapter = (setWorking) => {
    const navigate = (0, react_router_dom_1.useNavigate)(); // Hook for navigation
    const errored = (error, context) => {
        if (error instanceof Error) {
            // If the error is an instance of Error, use its message
            console.error(`Error ${context}:`, error.message);
        }
        else {
            // Handle other types of errors gracefully
            console.error(`Unknown error in ${context}:`, error);
        }
        if (setWorking) {
            setWorking(false);
        }
        // Navigate to a fallback route
        navigate('/login');
    };
    const sendPayload = (_a) => __awaiter(void 0, [_a], void 0, function* ({ transaction, body, params = [], errorString, useWorking = true }) {
        // Declare waitLayerTimeoutId outside the try block to make it accessible in both try and catch
        let waitLayerTimeoutId = null;
        try {
            // Set the wait layer timeout threshold
            const waitTimeout = 500; // ms
            // Start showing the wait layer if the operation takes more than 500ms
            // const showWaitLayer = new Promise<void>((resolve) => {
            waitLayerTimeoutId = setTimeout(() => {
                if (setWorking) {
                    console.log('should have setworking = true');
                    setWorking(true); // Show the wait layer
                }
            }, waitTimeout);
            // Construct query string from params array
            const urlWithParams = params.reduce((acc, param, index) => {
                const key = Object.keys(param)[0];
                const value = param[key];
                if (value !== undefined) {
                    const separator = index === 0 ? '?' : '&';
                    return `${acc}${separator}${key}=${encodeURIComponent(value)}`;
                }
                return acc; // Skip if value is undefined
            }, `${transaction}.php`);
            // Set up request options
            const options = {
                method: body ? 'POST' : 'GET',
                credentials: 'include', // Include cookies in the request
            };
            if (body) {
                options.body = body; // Add body if it's provided
            }
            // First, await the timeout to potentially show the wait layer
            //await showWaitLayer;
            // Make the request and store the response
            const response = yield fetch(`${transactionURL}/${urlWithParams}`, options);
            // Ensure response.ok is checked for valid HTTP responses
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
            // Parse and return the response data
            const data = yield response.json();
            // Clear the timeout and hide the wait layer
            if (waitLayerTimeoutId !== null) {
                clearTimeout(waitLayerTimeoutId); // Safely clear the timeout
            }
            if (useWorking && setWorking) {
                setWorking(false); // Hide the wait layer
            }
            return data;
        }
        catch (error) {
            // Clear timeout and hide the wait layer if error occurs
            if (waitLayerTimeoutId !== null) {
                clearTimeout(waitLayerTimeoutId); // Safely clear the timeout
            }
            if (useWorking && setWorking) {
                setWorking(false); // Hide the wait layer
            }
            errored(error, errorString); // Handle the error
            throw error; // Optionally re-throw the error for further handling
        }
    });
    // Logout
    const logout = () => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = 'logout';
        const data = yield sendPayload({
            transaction,
            errorString: 'fetching data',
            useWorking: false
        });
        return data;
    });
    const checkForCookie = () => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = 'authenticateuser';
        return sendPayload({
            transaction,
            errorString: 'Checking authentication',
            useWorking: false
        });
    });
    const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = 'authenticateuser';
        // Create the FormData
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const response = yield sendPayload({
            transaction,
            body: formData,
            errorString: 'authenticating user'
        });
        return response;
    });
    const fetchData = (table_1, orderBy_1, ...args_1) => __awaiter(void 0, [table_1, orderBy_1, ...args_1], void 0, function* (table, orderBy, useWorking = true) {
        const transaction = 'fetch';
        const params = [
            { tablename: table },
            { orderby: orderBy }
        ];
        const data = yield sendPayload({
            transaction,
            params,
            errorString: 'fetching data',
            useWorking
        });
        return data;
    });
    const fetchMonthDates = (seed_1, medication_1, ...args_1) => __awaiter(void 0, [seed_1, medication_1, ...args_1], void 0, function* (seed, medication, useWorking = true) {
        const transaction = 'fetchmonthdates';
        const params = [
            { seed_date: seed },
            { medication }
        ];
        const data = yield sendPayload({
            transaction,
            params,
            errorString: 'fetching month dates',
            useWorking
        });
        return data;
    });
    const markDate = (medication_1, date_1, marked_1, ...args_1) => __awaiter(void 0, [medication_1, date_1, marked_1, ...args_1], void 0, function* (medication, date, marked, useWorking = true) {
        const transaction = 'markdate';
        const params = [
            { medication },
            { date },
            { marked: marked.toString() }
        ];
        const data = yield sendPayload({
            transaction,
            params,
            errorString: 'Marking date',
            useWorking
        });
        return data;
    });
    return {
        logout,
        fetchData,
        checkForCookie,
        authenticateUser,
        markDate,
        fetchMonthDates
    };
};
exports.default = DBAdapter;
