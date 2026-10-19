import { BASE_THEME_ANIMATIONS, BASE_THEME_ASSETS } from './theme-assets';
import { WeddingTheme } from './theme.types';

export const TEMPLATE_STARTER_B: WeddingTheme = {
  name: 'starter-b',
  displayName: 'Starter B',
  palette: {
    primary: '#3D5A80',
    primaryDark: '#1E3348',
    primarySoft: '#6C86AB',
    primaryLight: '#D5E2F2',
    coupleSeparatorText: '#3D5A80',
    cardHeading: '#3D5A80',
    accent: '#98C1D9',
    heading: '#3D5A80',
    text: '#1E3348',
    surface: '#F7F5F2',
    surfaceAlt: '#E8EEF4',
    muted: '#868686',
    overlay: 'rgba(61, 90, 128, 0.60)',
    success: '#3D5A80',
    info: '#6C86AB',
    border: '#CCC',
  },
  assets: BASE_THEME_ASSETS,
  animations: BASE_THEME_ANIMATIONS,
};
