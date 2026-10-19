const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { SOURCE_LOTTIE_RGBA, generateThemeAssets } = require('./generate-theme-assets');

function writeFixture(root, relativePath, contents) {
  const filePath = path.join(root, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
}

test('generateThemeAssets recolors SVG files for the selected theme', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-assets-'));

  try {
    writeFixture(root, 'src/assets/images/decoration.svg', '<svg><path fill="#5C4A3A"/></svg>');

    generateThemeAssets('starter-b', root, {
      svgFiles: ['images/decoration.svg'],
      lottieFiles: [],
    });

    const generated = readFileSync(
      path.join(root, 'src/assets/generated/active/images/decoration.svg'),
      'utf8'
    );

    assert.match(generated, /#3D5A80/);
    assert.doesNotMatch(generated, /#5C4A3A/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('generateThemeAssets recolors Lottie JSON arrays and hex colors for the selected theme', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-assets-'));
  const lottie = {
    layers: [
      {
        shapes: [
          {
            c: {
              k: SOURCE_LOTTIE_RGBA,
            },
          },
        ],
      },
    ],
    sc: '#5C4A3A',
  };

  try {
    writeFixture(root, 'src/assets/animations/heart.json', JSON.stringify(lottie));

    generateThemeAssets('starter-b', root, {
      svgFiles: [],
      lottieFiles: ['animations/heart.json'],
    });

    const generated = JSON.parse(
      readFileSync(path.join(root, 'src/assets/generated/active/animations/heart.json'), 'utf8')
    );

    assert.deepEqual(generated.layers[0].shapes[0].c.k, [0.239215686275, 0.352941176471, 0.501960784314, 1]);
    assert.equal(generated.sc, '#3D5A80');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('generateThemeAssets keeps the source color for starter-a', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-assets-'));
  const lottie = {
    sc: '#5C4A3A',
  };

  try {
    writeFixture(root, 'src/assets/animations/heart.json', JSON.stringify(lottie));

    generateThemeAssets('starter-a', root, {
      svgFiles: [],
      lottieFiles: ['animations/heart.json'],
    });

    const generated = JSON.parse(
      readFileSync(path.join(root, 'src/assets/generated/active/animations/heart.json'), 'utf8')
    );

    assert.equal(generated.sc, '#5C4A3A');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
