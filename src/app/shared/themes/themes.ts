import { TEMPLATE_STARTER_A } from './template-starter-a.theme';
import { TEMPLATE_STARTER_B } from './template-starter-b.theme';
import { ThemeName, WeddingTheme } from './theme.types';

export const AVAILABLE_THEMES: Record<ThemeName, WeddingTheme> = {
  'starter-a': TEMPLATE_STARTER_A,
  'starter-b': TEMPLATE_STARTER_B,
};
