import { useLanguage } from '../context/LanguageContext';

const icons = ['✨', '🏠', '🧹'];

export default function WhoCanJoin() {
  const { t } = useLanguage();
  const providers = t('whoCanJoin.providers');
  if (!Array.isArray(providers)) return null;
  return (
    <section id="who-can-join" className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-800 text-center mb-4">{t('whoCanJoin.title')}</h2>
        <p className="text-stone-600 text-center mb-16 max-w-2xl mx-auto">{t('whoCanJoin.subtitle')}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <div key={index} className="group p-8 bg-white rounded-2xl border border-sand-dark/50 shadow-sm hover:border-sage/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">{icons[index]}</div>
              <h3 className="font-semibold text-stone-800 text-lg mb-3 group-hover:text-sage-dark transition-colors">{provider.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{provider.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
