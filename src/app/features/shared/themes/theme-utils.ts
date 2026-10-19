import { WeddingTheme } from './theme.types';

export type ThemeStyleProperties = Record<`--theme-${string}`, string>;

function cssUrl(assetPath: string): string {
  return `url("${assetPath}")`;
}

function optionalCssUrl(assetPath: string): string {
  return assetPath ? cssUrl(assetPath) : 'none';
}

export function buildThemeStyleProperties(theme: WeddingTheme): ThemeStyleProperties {
  return {
    '--theme-primary': theme.palette.primary,
    '--theme-primary-dark': theme.palette.primaryDark,
    '--theme-primary-soft': theme.palette.primarySoft,
    '--theme-primary-light': theme.palette.primaryLight,
    '--theme-couple-separator-text': theme.palette.coupleSeparatorText,
    '--theme-card-heading': theme.palette.cardHeading,
    '--theme-accent': theme.palette.accent,
    '--theme-heading': theme.palette.heading,
    '--theme-text': theme.palette.text,
    '--theme-surface': theme.palette.surface,
    '--theme-surface-alt': theme.palette.surfaceAlt,
    '--theme-muted': theme.palette.muted,
    '--theme-overlay': theme.palette.overlay,
    '--theme-success': theme.palette.success,
    '--theme-info': theme.palette.info,
    '--theme-border': theme.palette.border,
    '--theme-banner-image': optionalCssUrl(theme.assets.bannerImage),
    '--theme-decoration': optionalCssUrl(theme.assets.decoration),
  };
}

export function applyThemeStyleProperties(theme: WeddingTheme, target: HTMLElement): void {
  const properties = buildThemeStyleProperties(theme);

  Object.entries(properties).forEach(([name, value]) => {
    target.style.setProperty(name, value);
  });

  target.dataset['theme'] = theme.name;
}
