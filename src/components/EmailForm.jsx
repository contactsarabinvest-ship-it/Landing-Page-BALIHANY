import { useState } from 'react';
import { storeEmail } from '../lib/emailService';
import { useLanguage } from '../context/LanguageContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORY_KEYS = ['conciergeries', 'interiorDesigners', 'cleaningServices'];

export default function EmailForm({ variant = 'default', placeholder, buttonText, onSuccess }) {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const toggleCategory = (key) => {
    setCategories((prev) => prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]);
    if (status === 'error') setStatus('idle');
  };

  const validate = (emailVal, categoriesVal) => {
    if (!categoriesVal?.length) return t('form.errorCategory');
    if (!emailVal.trim()) return t('form.errorRequired');
    if (!EMAIL_REGEX.test(emailVal)) return t('form.errorInvalid');
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(email, categories);
    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }
    setError('');
    setStatus('loading');
    try {
      await storeEmail(email, categories.join(', '));
      setStatus('success');
      setCategories([]);
      setEmail('');
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setError(t('form.errorGeneric'));
    }
  };

  const isCompact = variant === 'compact';
  const isHero = variant === 'hero';
  const place = placeholder ?? t('form.emailPlaceholder');
  const btnText = buttonText ?? t('form.joinWaitlist');
  const disabled = status === 'loading' || status === 'success';

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${isCompact ? 'sm:max-w-lg' : ''}`}>
      <div className="w-full">
        <p className="text-sm font-medium text-stone-600 mb-2">{t('form.categoryPlaceholder')}</p>
        <div className="flex flex-wrap gap-4">
          {CATEGORY_KEYS.map((key) => (
            <label key={key} className={`flex items-center gap-2 cursor-pointer select-none ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}>
              <input type="checkbox" checked={categories.includes(key)} onChange={() => toggleCategory(key)} disabled={disabled} className="w-4 h-4 rounded border-sand-dark text-sage focus:ring-sage/50" />
              <span className={isHero ? 'text-lg' : ''}>{t(`form.categories.${key}`)}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={`flex flex-col gap-3 ${isCompact ? 'sm:flex-row sm:flex-1 sm:gap-3' : ''}`}>
        <div className={isCompact ? 'flex-1 min-w-0' : ''}>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }} placeholder={place} disabled={disabled}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 placeholder:text-stone-400 focus:outline-none focus:ring-2 disabled:opacity-70 disabled:cursor-not-allowed ${isHero ? 'text-lg bg-white/80 border-sand-dark focus:ring-sage/50 focus:border-sage' : 'bg-white border-sand-dark focus:ring-sage/50 focus:border-sage'}`}
            aria-label={t('form.emailAriaLabel')} />
        </div>
        <button type="submit" disabled={disabled} className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed whitespace-nowrap bg-sage hover:bg-sage-dark text-white focus:outline-none focus:ring-2 focus:ring-sage/50 focus:ring-offset-2 ${isCompact ? 'sm:flex-shrink-0' : ''}`}>
          {status === 'loading' && t('form.joining')}
          {status === 'success' && `✓ ${t('form.successMessage')}`}
          {(status === 'idle' || status === 'error') && btnText}
        </button>
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {status === 'success' && <p className="text-sm text-sage-dark">{t('form.thankYou')}</p>}
    </form>
  );
}
