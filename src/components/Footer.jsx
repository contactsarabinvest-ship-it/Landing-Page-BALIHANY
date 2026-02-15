import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="px-6 py-12 border-t border-sand-dark/50">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl font-semibold text-stone-800">Balihany</p>
        <nav className="flex gap-8 text-sm text-stone-600">
          <a href="#how-it-works" className="hover:text-sage transition-colors">{t('nav.howItWorks')}</a>
          <a href="#who-can-join" className="hover:text-sage transition-colors">{t('nav.whoCanJoin')}</a>
          <a href="#join" className="hover:text-sage transition-colors">{t('nav.joinWaitlist')}</a>
        </nav>
        <p className="text-stone-400 text-sm">© {new Date().getFullYear()} Balihany. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
