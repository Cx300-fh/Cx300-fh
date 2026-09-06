import { readFile, writeFile, rm } from 'node:fs/promises';
const output = new URL('../dist/client/', import.meta.url);
for (const filename of ['index.html', '404.html']) {
  const file = new URL(filename, output);
  let html = await readFile(file, 'utf8');
  // This site has no client routing or React state. Keep the rendered HTML and
  // CSS, then enhance it with the same standalone script used in development.
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<link\b[^>]*>/gi, tag => /rel="modulepreload"|as="script"/.test(tag) ? '' : tag);
  html = html.replaceAll('href="/_next/', 'href="_next/');
  if (filename === 'index.html') html = html.replace('</body>', '<script src="interactions.js" defer></script></body>');
  await writeFile(file, html);
}
await rm(new URL('_next/static/chunks/', output), { recursive: true, force: true });
await rm(new URL('.vite/', output), { recursive: true, force: true });
await rm(new URL('index.rsc', output), { force: true });
await rm(new URL('vinext-client-entry-manifest.json', output), { force: true });
await writeFile(new URL('.nojekyll', output), '');
console.log('Portable static export ready: dist/client');
