/**
 * Writes the dotted departure and arrival maps as static SVG files.
 * Run: npm run maps  (output is committed; rerun only if geo.ts changes)
 */
import { writeFileSync } from 'node:fs';
import { landDots, MAPS, type MapKey } from '../src/lib/geo.ts';

for (const k of ['hero', 'arr'] as MapKey[]) {
  const { W, H } = MAPS[k];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><path fill="#0B2231" fill-opacity="0.3" d="${landDots(k)}"/></svg>\n`;
  writeFileSync(new URL(`../public/maps/${k}.svg`, import.meta.url), svg);
  console.log(`public/maps/${k}.svg  ${(svg.length / 1024).toFixed(1)} KB`);
}
