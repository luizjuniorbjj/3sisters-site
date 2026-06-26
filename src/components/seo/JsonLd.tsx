/**
 * JsonLd — Inject schema.org structured data into a page.
 *
 * Server Component. Safe to use in any page.tsx or layout.tsx.
 * Pattern adapted from L,B&J Solutions Wave 1.5 schema strategy.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
