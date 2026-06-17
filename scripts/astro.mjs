#!/usr/bin/env node
// Astro launcher that isolates the build from a polluted shell environment.
//
// Astro/Vite read `import.meta.env.BASE_URL` and `Astro.site` from config, but a
// stray `BASE_URL` (or `SITE`) exported by an unrelated project in the user's
// shell profile can shadow the configured `base`/`site` and silently rewrite every
// asset URL. The locked subpath (`base: '/portfolio-v6'`) is the single source of
// truth, so we strip those vars before handing off to the Astro CLI. CI runs with a
// clean env, so this is purely a local-dev safety net (and a no-op there).
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const env = { ...process.env };
for (const key of ['BASE_URL', 'SITE']) {
  if (key in env) delete env[key];
}

// Resolve the Astro CLI entry from the package's `bin` field (its own subpath
// isn't exported, so resolve the package root and join the declared bin script).
const pkgJsonPath = require.resolve('astro/package.json');
const pkg = require('astro/package.json');
const binRel = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.astro;
const astroBin = join(dirname(pkgJsonPath), binRel);
const args = process.argv.slice(2);

const child = spawn(process.execPath, [astroBin, ...args], {
  stdio: 'inherit',
  env,
});

child.on('exit', (code) => process.exit(code ?? 0));
child.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
