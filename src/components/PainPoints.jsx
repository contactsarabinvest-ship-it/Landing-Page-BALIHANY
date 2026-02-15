import { useLanguage } from '../context/LanguageContext';

export default function PainPoints() {
  const { t } = useLanguage();
  const items = t('painPoints.items');
  if (!Array.isArray(items)) return null;
  return (
    <section id="how-it-works" className="px-6 py-20 bg-sand/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-800 text-center mb-4">{t('painPoints.title')}</h2>
        <p className="text-stone-600 text-center mb-16 max-w-2xl mx-auto">{t('painPoints.subtitle')}</p>
        <div className="space-y-10">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-sand-dark/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="sm:w-48 flex-shrink-0">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sage/20 text-sage font-semibold">{index + 1}</span>
                <h3 className="mt-2 font-semibold text-stone-800">{item.problem}</h3>
              </div>
              <p className="text-stone-600 leading-relaxed flex-1">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
