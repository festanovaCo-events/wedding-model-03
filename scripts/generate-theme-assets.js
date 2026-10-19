const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');

const DEFAULT_SVG_FILES = ['images/decoration.svg'];

const DEFAULT_LOTTIE_FILES = [
  'animations/heart.json',
  'animations/heart_pulse.json',
  'animations/music.json',
];

const SOURCE_LOTTIE_RGBA = [0.360784313725, 0.290196078431, 0.227450980392, 1];
const HOJAS_LOTTIE_RGBA = [0.505882352941, 0.580392156863, 0.545098039216, 1];
const LOTTIE_SOURCE_ARRAYS = [SOURCE_LOTTIE_RGBA, HOJAS_LOTTIE_RGBA];

const THEME_COLOR_MAPS = {
  'starter-a': {
    hex: {
      '#5C4A3A': '#5C4A3A',
      '#5c4a3a': '#5C4A3A',
    },
    lottieHex: {
      '#5C4A3A': '#5C4A3A',
      '#5c4a3a': '#5C4A3A',
      '#C6D7CF': '#8C735F',
      '#c6d7cf': '#8C735F',
    },
    lottiePrimary: SOURCE_LOTTIE_RGBA,
  },
  'starter-b': {
    hex: {
      '#5C4A3A': '#3D5A80',
      '#5c4a3a': '#3D5A80',
    },
    lottieHex: {
      '#5C4A3A': '#3D5A80',
      '#5c4a3a': '#3D5A80',
      '#C6D7CF': '#6C86AB',
      '#c6d7cf': '#6C86AB',
    },
    lottiePrimary: [0.239215686275, 0.352941176471, 0.501960784314, 1],
  },
};

function isColorArray(value, color) {
  return (
    Array.isArray(value) &&
    value.length === color.length &&
    value.every((entry, index) => typeof entry === 'number' && Math.abs(entry - color[index]) < 0.000001)
  );
}

function recolorSvg(contents, themeName) {
  const theme = THEME_COLOR_MAPS[themeName];

  return Object.entries(theme.hex).reduce(
    (current, [source, target]) => current.replace(new RegExp(source, 'gi'), target),
    contents
  );
}

function recolorLottieValue(value, themeName) {
  const theme = THEME_COLOR_MAPS[themeName];

  if (typeof value === 'string') {
    return Object.entries(theme.lottieHex).reduce(
      (current, [source, target]) => current.replace(new RegExp(source, 'gi'), target),
      value
    );
  }

  if (LOTTIE_SOURCE_ARRAYS.some((color) => isColorArray(value, color))) {
    return theme.lottiePrimary;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => recolorLottieValue(entry, themeName));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, recolorLottieValue(entry, themeName)])
    );
  }

  return value;
}

function writeGeneratedFile(rootDir, relativePath, contents) {
  const destination = path.join(rootDir, 'src', 'assets', 'generated', 'active', relativePath);

  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
}

function generateThemeAssets(themeName, rootDir = process.cwd(), options = {}) {
  if (!THEME_COLOR_MAPS[themeName]) {
    throw new Error(`Unknown theme "${themeName}" for asset generation`);
  }

  const svgFiles = options.svgFiles || DEFAULT_SVG_FILES;
  const lottieFiles = options.lottieFiles || DEFAULT_LOTTIE_FILES;

  svgFiles.forEach((relativePath) => {
    const source = path.join(rootDir, 'src', 'assets', relativePath);
    const contents = readFileSync(source, 'utf8');
    writeGeneratedFile(rootDir, relativePath, recolorSvg(contents, themeName));
  });

  lottieFiles.forEach((relativePath) => {
    const source = path.join(rootDir, 'src', 'assets', relativePath);
    const contents = JSON.parse(readFileSync(source, 'utf8'));
    writeGeneratedFile(rootDir, relativePath, `${JSON.stringify(recolorLottieValue(contents, themeName))}\n`);
  });
}

module.exports = {
  DEFAULT_LOTTIE_FILES,
  DEFAULT_SVG_FILES,
  SOURCE_LOTTIE_RGBA,
  THEME_COLOR_MAPS,
  generateThemeAssets,
  recolorLottieValue,
  recolorSvg,
};
