import { BASE_THEME_ANIMATIONS, BASE_THEME_ASSETS } from './theme-assets';
import { WeddingTheme } from './theme.types';

export const TEMPLATE_STARTER_A: WeddingTheme = {
  name: 'starter-a',
  displayName: 'Emerald Gold',
  palette: {
    primary: '#0B2E2A',
    primaryDark: '#071F1C',
    primarySoft: '#1A4A43',
    primaryLight: '#D8E5E1',
    coupleSeparatorText: '#C9A84C',
    cardHeading: '#0B2E2A',
    accent: '#C9A84C',
    heading: '#0B2E2A',
    text: '#1F2A27',
    surface: '#F7F3EB',
    surfaceAlt: '#EFE9DF',
    muted: '#7A847F',
    overlay: 'rgba(11, 46, 42, 0.72)',
    success: '#0B2E2A',
    info: '#1A4A43',
    border: '#D4CBB8',
  },
  assets: BASE_THEME_ASSETS,
  animations: BASE_THEME_ANIMATIONS,
};
