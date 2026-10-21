# Festanova invite template

Plantilla Angular para crear un modelo nuevo de invitación. La plataforma (confirmación, API, layout y motor de temas) ya está. El diseño visual vive en `src/app/components`, `src/app/pages`, `src/app/constants` y en los assets base.

`shared` se copió de `wedding-model-02` al crear esta carpeta. Un arreglo posterior de confirmación no llega solo a los otros repos: hay que portarlo a mano.

## Copiar esta carpeta

Copia sin historial, dependencias ni build:

```bash
rsync -a --exclude .git --exclude node_modules --exclude dist --exclude .angular \
  festanova-invite-template/ festanova-invite-wedding-model-03/
cd festanova-invite-wedding-model-03
```

## Sellar un modelo

```bash
node scripts/stamp-model.js wedding-model-03
```

Eso deja el paquete `festanova-invite-wedding-model-03` y el `baseHref` `/invitations-wedding-model-03/`. No cambia los archivos de tema.

## Variante de color

El color no se duplica en el HTML. Cada variante es un `template-*.theme.ts` y el script recolorea los assets base hacia `src/assets/generated/active/`.

```bash
npm run theme:a
npm run theme:b
```

Para agregar otra paleta, sigue [docs/sistema-temas-template.md](docs/sistema-temas-template.md).

## Contenido de la invitación

Textos, fechas y lugares salen de `src/app/shared/constants/wedding-info.ts`. Los textos propios del diseño salen de `src/app/constants/m03-info.ts`.

Las imágenes y animaciones del modelo se declaran en `theme.types.ts` (`ThemeAssets` y `ThemeAnimations`). El starter trae portada, un SVG y los Lottie `heart`, `heart_pulse` y `music`. Si el diseño nuevo necesita otra decoración, agrega el campo al tipo, a `theme-assets.ts` y al mapa de color.

## Arranque local

```bash
npm install
npm start
```

La app queda en `http://localhost:4200/`.

## Conventional Commits

Los mensajes de commit siguen [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.).

- Local: husky + commitlint en `commit-msg` (se puede saltar con `--no-verify`).
- Remoto: el workflow [`.github/workflows/commitlint.yml`](.github/workflows/commitlint.yml) valida los commits de cada PR.

Para que el merge a `main` quede bloqueado si falla: en GitHub → **Settings → Branches** → protege `main` → **Require status checks to pass** → marca el check `commitlint`.

## Publicar

1. Crea un proyecto Vercel para este SPA.
2. El `baseHref` ya lo escribió `stamp-model.js`.
3. En `festanovaco-web`, agrega el rewrite del prefijo (`/invitations-…`) hacia la URL de ese deploy y la variable de entorno del shell.
4. El API no cambia: el invitado se identifica por `token`.

Fotos que no son una URL absoluta pasan por Cloudinary. El cloud name sale de `NG_APP_CLOUDINARY_CLOUD` (por defecto `dwx09pwkr`) a través de `scripts/generate-environment.js`.

Los archivos generados (`active-theme.ts`, `theme-vars.generated.css` y `src/assets/generated/active`) se quedan en el repo porque Angular importa esos JSON.
