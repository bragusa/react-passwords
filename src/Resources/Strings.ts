
type Translations = {
  [language: string]: {
    [key: string]: string;
  };
};

class Strings {
  private translations: Translations = {
    en: {
      sign_in: 'Sign in',
      sign_out: 'Sign out',
      enter_your_credentials: 'Please enter your credentials',
      welcome_to: 'Welcome to {0}',
    },
    es: {
      welcome: '¡Bienvenido {0}!',
      sign_in: 'Iniciar sesión',
      sign_out: 'Cerrar sesión',
    },
  };

  private currentLanguage: string = 'en';

  // Getter: Fetch string with optional replacements and language code
  public get(key: string, replacements: (string | number)[] = [], lang?: string): string {
    const language = lang || this.currentLanguage;
    const translation = this.translations[language]?.[key];
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
  public setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguage = language;
    } else {
      console.warn(`Language "${language}" not supported.`);
    }
  }

  // Add or update translations for a specific language
  public addTranslations(language: string, newTranslations: Record<string, string>): void {
    if (!this.translations[language]) {
      this.translations[language] = {};
    }
    Object.assign(this.translations[language], newTranslations);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Strings();
