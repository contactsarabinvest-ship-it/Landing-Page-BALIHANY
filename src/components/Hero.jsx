import EmailForm from './EmailForm';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-sage font-medium text-sm uppercase tracking-widest mb-4 animate-in">{t('hero.comingSoon')}</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-stone-800 leading-tight mb-6 animate-in animate-delay-150">{t('hero.headline')}<span className="text-sage">{t('hero.headlineHighlight')}</span></h1>
        <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10 animate-in animate-delay-300">{t('hero.subheadline')}</p>
        <div className="max-w-md mx-auto animate-in animate-delay-500">
          <EmailForm variant="hero" placeholder={t('hero.emailPlaceholder')} buttonText={t('form.joinWaitlist')} />
        </div>
      </div>
    </section>
  );
}
