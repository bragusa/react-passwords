"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Strings {
    constructor() {
        this.translations = {
            en: {
                sign_in: 'Sign in',
                sign_out: 'Sign out',
                enter_your_credentials: 'Please enter your credentials',
                welcome_to: 'Welcome to {0}',
                show_password: 'Show password',
                https_require: 'You must use https!'
            },
            es: {
                welcome: '¡Bienvenido {0}!',
                sign_in: 'Iniciar sesión',
                sign_out: 'Cerrar sesión',
            },
        };
        this.currentLanguage = 'en';
    }
    // Getter: Fetch string with optional replacements and language code
    get(key, replacements = [], lang) {
        var _a;
        const language = lang || this.currentLanguage;
        const translation = (_a = this.translations[language]) === null || _a === void 0 ? void 0 : _a[key];
        if (!translation) {
            console.log(`Missing translation for "${key}" in "${language}"`);
            return `${key}:${lang}`;
        }
        // Replace placeholders {0}, {1}, etc., with provided values
        return translation.replace(/{(\d+)}/g, (match, index) => {
            return typeof replacements[index] !== 'undefined'
                ? replacements[index].toString()
                : match;
        });
    }
    // Set the current language
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
        }
        else {
            console.warn(`Language "${language}" not supported.`);
        }
    }
    // Add or update translations for a specific language
    addTranslations(language, newTranslations) {
        if (!this.translations[language]) {
            this.translations[language] = {};
        }
        Object.assign(this.translations[language], newTranslations);
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
exports.default = new Strings();
