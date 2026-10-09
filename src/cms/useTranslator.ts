import { getTranslator } from '../i18n/translations';
import type { Language } from '../types';
import { useSite } from './store';
// Bind translations to this request/provider; concurrent SSR requests never share overrides.
export function useTranslator(language: Language) {
  return getTranslator(language, useSite().data.content);
}
