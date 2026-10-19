export type ThemeName = 'starter-a' | 'starter-b';

export interface ThemePalette {
  primary: string;
  primaryDark: string;
  primarySoft: string;
  primaryLight: string;
  coupleSeparatorText: string;
  cardHeading: string;
  accent: string;
  heading: string;
  text: string;
  surface: string;
  surfaceAlt: string;
  muted: string;
  overlay: string;
  success: string;
  info: string;
  border: string;
}

export interface ThemeAssets {
  bannerImage: string;
  music: string;
  decoration: string;
}

export interface ThemeAnimations {
  heart: object;
  heartPulse: object;
  music: object;
}

export interface WeddingTheme {
  name: ThemeName;
  displayName: string;
  palette: ThemePalette;
  assets: ThemeAssets;
  animations: ThemeAnimations;
}
