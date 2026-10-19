# Sistema de temas

Las variantes de color de un mismo modelo viven en archivos de tema y en assets generados. El HTML usa clases como `bg-primary` y `text-heading`.

## Archivos

- `src/app/features/shared/themes/theme.types.ts`: paleta fija y los huecos de assets de este modelo.
- `src/app/features/shared/themes/template-starter-a.theme.ts` y `template-starter-b.theme.ts`: paletas de ejemplo.
- `src/app/features/shared/themes/theme-assets.ts`: rutas e imports de los assets generados.
- `src/app/features/shared/themes/active-theme.ts`: generado. No se edita a mano.
- `scripts/select-theme.js`: elige el tema, escribe las variables CSS y llama al recoloreo.
- `scripts/generate-theme-assets.js`: recolorea el SVG y los Lottie base según `THEME_COLOR_MAPS`.
- `src/assets/images` y `src/assets/animations`: fuentes. Edita estas.
- `src/assets/generated/active`: salida. No la edites a mano.

## Cambiar de tema

```bash
npm run theme:a
npm run theme:b
```

También puedes usar `TEMPLATE_THEME=starter-b npm run build`. Si no pasas tema, `prestart` y `prebuild` conservan el que ya está en `active-theme.ts`.

## Agregar una variante de color

1. Crea `src/app/features/shared/themes/template-<nombre>.theme.ts` con la paleta completa.
2. Agrega el nombre al tipo `ThemeName`.
3. Regístralo en `themes.ts`.
4. Agrégalo en `THEMES` dentro de `scripts/select-theme.js`.
5. Agrega su mapa en `THEME_COLOR_MAPS` dentro de `scripts/generate-theme-assets.js`. El hex de origen es el color de los assets base (`#5C4A3A` en el starter).
6. Agrega un script en `package.json`, por ejemplo `"theme:nuevo": "node scripts/select-theme.js <nombre>"`.

## Agregar una decoración

1. Pon el archivo fuente en `src/assets`.
2. Agrega el campo en `ThemeAssets` o `ThemeAnimations`.
3. Apunta `theme-assets.ts` a `assets/generated/active/...`.
4. Incluye el archivo en `DEFAULT_SVG_FILES` o `DEFAULT_LOTTIE_FILES`.
5. Usa el asset desde el componente del modelo o desde una variable CSS en `theme-utils.ts`.

## Verificación

```bash
node --test scripts/select-theme.test.js scripts/generate-theme-assets.test.js
npm test -- --watch=false --browsers=ChromeHeadless
```
