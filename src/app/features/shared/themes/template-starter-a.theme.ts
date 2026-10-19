import { BASE_THEME_ANIMATIONS, BASE_THEME_ASSETS } from './theme-assets';
import { WeddingTheme } from './theme.types';

export const TEMPLATE_STARTER_A: WeddingTheme = {
  name: 'starter-a',
  displayName: 'Starter A',
  palette: {
    primary: '#5C4A3A',
    primaryDark: '#3E3126',
    primarySoft: '#8C735F',
    primaryLight: '#E4D5C8',
    coupleSeparatorText: '#5C4A3A',
    cardHeading: '#8B6F4A',
    accent: '#BFA880',
    heading: '#5C4A3A',
    text: '#3E3126',
    surface: '#FAF7F3',
    surfaceAlt: '#EFEDE7',
    muted: '#868686',
    overlay: 'rgba(92, 74, 58, 0.60)',
    success: '#5C4A3A',
    info: '#8C735F',
    border: '#CCC',
  },
  assets: BASE_THEME_ASSETS,
  animations: BASE_THEME_ANIMATIONS,
};
