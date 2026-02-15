import { createContext, useContext, useState, useEffect } from 'react';
import { translations, defaultLocale } from '../i18n/translations';

const STORAGE_KEY = 'balihany_locale';
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || defaultLocale; } catch { return defaultLocale; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, locale); } catch {}
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (newLocale) => {
    if (translations[newLocale]) setLocaleState(newLocale);
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[locale];
    for (const key of keys) value = value?.[key];
    return value ?? translations[defaultLocale]?.[keys[0]]?.[keys[1]] ?? path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRtl: locale === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
