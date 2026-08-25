import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [path.join(__dirname, 'src', 'editor-entry.js')],
  bundle: true,
  outfile: path.join(__dirname, 'public', 'dist', 'bundle.js'),
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  logLevel: 'info',
});
