/**
 * src/lib/slugify.ts
 * Canonical slugify helper — used for FAQ anchor links (id="q-{slug}") and similar
 * deep-link patterns.
 *
 * Aligned with LBJ Wave 1.5 pattern (Atlas faq-semantic-pattern.md).
 */

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
