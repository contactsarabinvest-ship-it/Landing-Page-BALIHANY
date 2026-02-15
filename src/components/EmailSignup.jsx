import EmailForm from './EmailForm';
import { useLanguage } from '../context/LanguageContext';

export default function EmailSignup() {
  const { t } = useLanguage();
  const benefits = t('emailSignup.benefits');
  return (
    <section id="join" className="px-6 py-24 bg-sage/10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-800 mb-4">{t('emailSignup.title')}</h2>
        <p className="text-stone-600 mb-8">{t('emailSignup.subtitle')}</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-stone-600 text-sm">
          {Array.isArray(benefits) && benefits.map((benefit, i) => <li key={i} className="flex items-center gap-2"><span className="text-sage">✓</span>{benefit}</li>)}
        </ul>
        <div className="max-w-md mx-auto">
          <EmailForm variant="compact" placeholder={t('hero.emailPlaceholder')} buttonText={t('emailSignup.buttonText')} />
        </div>
      </div>
    </section>
  );
}
