import { useLanguage } from '../context/LanguageContext';

export default function Vision() {
  const { t } = useLanguage();
  return (
    <section className="px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <blockquote className="font-display text-2xl sm:text-3xl font-medium text-stone-700 leading-relaxed italic">"{t('vision.quote')}"</blockquote>
        <p className="mt-6 text-stone-500 text-sm">{t('vision.attribution')}</p>
      </div>
    </section>
  );
}
