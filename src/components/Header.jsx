import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { localeNames } from '../i18n/translations';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const langRefMobile = useRef(null);
  const { t, locale, setLocale } = useLanguage();

  const navLinks = [
    { href: '#how-it-works', label: t('nav.howItWorks') },
    { href: '#who-can-join', label: t('nav.whoCanJoin') },
    { href: '#join', label: t('nav.joinWaitlist') },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (!langRef.current?.contains(e.target) && !langRefMobile.current?.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const LangDropdown = ({ refProp }) => (
    <div className="relative" ref={refProp}>
      <button type="button" onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-sage hover:bg-sand/50 transition-colors" aria-expanded={langOpen} aria-haspopup="true">
        <span>{localeNames[locale]}</span>
        <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {langOpen && (
        <div className="absolute top-full mt-1 end-0 min-w-[10rem] py-1 bg-white rounded-lg border border-sand-dark/50 shadow-lg z-50">
          {Object.entries(localeNames).map(([code, name]) => (
            <button key={code} type="button" onClick={() => { setLocale(code); setLangOpen(false); }} className={`block w-full text-start px-4 py-2 text-sm hover:bg-sand/50 ${locale === code ? 'text-sage font-medium' : 'text-stone-600'}`}>{name}</button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand-dark/30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-semibold text-stone-800 hover:text-sage transition-colors">balihany</a>
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => <a key={link.href} href={link.href} className="text-sm font-medium text-stone-600 hover:text-sage transition-colors">{link.label}</a>)}
          <LangDropdown refProp={langRef} />
          <a href="#join" className="px-4 py-2 rounded-lg bg-sage text-white text-sm font-medium hover:bg-sage-dark transition-colors">{t('nav.joinWaitlistButton')}</a>
        </nav>
        <div className="flex items-center gap-2 sm:hidden">
          <LangDropdown refProp={langRefMobile} />
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-stone-600" aria-label={t('form.menuAriaLabel')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="sm:hidden border-t border-sand-dark/30 bg-cream px-6 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-stone-600 hover:text-sage font-medium">{link.label}</a>)}
            <a href="#join" onClick={() => setMobileOpen(false)} className="inline-flex justify-center px-4 py-2 rounded-lg bg-sage text-white font-medium">{t('nav.joinWaitlistButton')}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
