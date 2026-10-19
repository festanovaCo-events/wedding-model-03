#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');

const rootDir = path.join(__dirname, '..');
const identityPath = path.join(rootDir, 'model.identity.json');

function readIdentity() {
  return JSON.parse(readFileSync(identityPath, 'utf8'));
}

function writeIdentity(identity) {
  writeFileSync(identityPath, `${JSON.stringify(identity, null, 2)}\n`);
}

function writeModelIdentityModule(identity) {
  const contents = `export const MODEL_IDENTITY: {
  modelId: string;
  packageName: string;
  baseHref: string;
} = {
  modelId: '${identity.modelId}',
  packageName: '${identity.packageName}',
  baseHref: '${identity.baseHref}',
};
`;
  writeFileSync(
    path.join(rootDir, 'src', 'app', 'shared', 'constants', 'model-identity.ts'),
    contents
  );
}

function replaceInFile(relativePath, from, to) {
  const filePath = path.join(rootDir, relativePath);
  const contents = readFileSync(filePath, 'utf8');
  if (!contents.includes(from)) {
    throw new Error(`No se encontró "${from}" en ${relativePath}`);
  }
  writeFileSync(filePath, contents.split(from).join(to));
}

function replaceBaseHref(previousBaseHref, nextBaseHref) {
  const relativePath = 'angular.json';
  const filePath = path.join(rootDir, relativePath);
  const contents = readFileSync(filePath, 'utf8');
  const pattern = new RegExp(`"baseHref": "${previousBaseHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`);
  if (!pattern.test(contents)) {
    throw new Error(`No se encontró baseHref "${previousBaseHref}" en angular.json`);
  }
  writeFileSync(filePath, contents.replace(pattern, `"baseHref": "${nextBaseHref}"`));
}

function writeVercelConfig(baseHref) {
  const prefix = baseHref === '/' ? '' : baseHref.replace(/\/$/, '');
  const rewrites = [];

  if (prefix) {
    rewrites.push(
      { source: `${prefix}/(.*\\..*)`, destination: '/$1' },
      { source: `${prefix}/(.*)`, destination: '/index.html' }
    );
  }

  rewrites.push({ source: '/(.*)', destination: '/index.html' });

  const config = {
    framework: null,
    buildCommand: 'NODE_OPTIONS=--max-old-space-size=6144 npm run build',
    rewrites,
  };

  writeFileSync(path.join(rootDir, 'vercel.json'), `${JSON.stringify(config, null, 2)}\n`);
}

function stamp(modelId) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(modelId)) {
    throw new Error('El id solo puede usar minúsculas, números y guiones. Ejemplo: wedding-model-03');
  }

  const previous = readIdentity();
  const next = {
    modelId,
    packageName: `festanova-invite-${modelId}`,
    baseHref: `/invitations-${modelId}/`,
  };

  replaceBaseHref(previous.baseHref, next.baseHref);

  const files = ['package.json', 'package-lock.json', 'angular.json', 'firebase.json', 'nginx.conf'];
  files.forEach((file) => replaceInFile(file, previous.packageName, next.packageName));

  writeIdentity(next);
  writeModelIdentityModule(next);
  writeVercelConfig(next.baseHref);

  console.log(`Modelo sellado: ${next.modelId}`);
  console.log(`Paquete: ${next.packageName}`);
  console.log(`baseHref: ${next.baseHref}`);
  console.log('Siguiente paso de publicación: proyecto Vercel de este SPA y rewrite en festanovaco-web.');
}

const modelId = process.argv[2];
if (!modelId) {
  console.error('Uso: node scripts/stamp-model.js <id>');
  console.error('Ejemplo: node scripts/stamp-model.js wedding-model-03');
  process.exit(1);
}

stamp(modelId);
