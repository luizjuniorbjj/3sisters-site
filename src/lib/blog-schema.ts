/**
 * src/lib/blog-schema.ts
 * JSON-LD schema helpers for the 3 Sisters Services blog.
 *
 * Source pattern: L,B&J Solutions Moat Guide schema (Article + Blog + Speakable).
 * Reuses canonical @id anchors from src/lib/schema.ts.
 */

import { BlogPostContent } from '@/data/blog-posts';
import { SITE_URL, ORG_ID, PERSON_ID, WEBSITE_ID } from '@/lib/schema';

const BLOG_ID = `${SITE_URL}/blog/#blog`;
const BLOG_DESCRIPTION =
  'Expert cleaning tips, hiring guides, and Airbnb host advice from a family-owned cleaning company in New York and California.';

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function countWords(text: string): number {
  const cleaned = stripHtml(text);
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

function calculateWordCount(post: BlogPostContent, locale: 'en' | 'es' = 'en'): number {
  const loc = post[locale];
  let count = countWords(loc.leadParagraph);
  for (const section of loc.sections) {
    count += countWords(section.heading) + countWords(section.html);
  }
  count += countWords(loc.closingCta);
  for (const faq of loc.faqs) {
    count += countWords(faq.question) + countWords(faq.answer);
  }
  return count;
}

function absoluteImage(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

function postUrl(slug: string, locale: 'en' | 'es' = 'en'): string {
  return locale === 'es'
    ? `${SITE_URL}/es/blog/${slug}/`
    : `${SITE_URL}/blog/${slug}/`;
}

/**
 * BlogPosting schema for a single blog post.
 */
export function generateArticleSchema(
  post: BlogPostContent,
  locale: 'en' | 'es' = 'en'
): Record<string, unknown> {
  const loc = post[locale];
  const url = postUrl(post.slug, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    isPartOf: { '@id': BLOG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: loc.title,
    description: loc.description,
    image: [absoluteImage(post.cover)],
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    articleSection: post.category,
    keywords: post.category,
    timeRequired: `PT${post.readMinutes}M`,
    wordCount: calculateWordCount(post, locale),
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: { '@id': ORG_ID },
    },
    publisher: { '@id': ORG_ID },
  };
}

/**
 * @graph for /blog listing: CollectionPage + Blog + ItemList.
 */
export function generateBlogListingSchema(posts: BlogPostContent[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/blog/#collection`,
        url: `${SITE_URL}/blog/`,
        name: 'Blog | 3 Sisters Services',
        description: BLOG_DESCRIPTION,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        inLanguage: 'en-US',
        mainEntity: { '@id': BLOG_ID },
      },
      {
        '@type': 'Blog',
        '@id': BLOG_ID,
        url: `${SITE_URL}/blog/`,
        name: 'Blog | 3 Sisters Services',
        description: BLOG_DESCRIPTION,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-US',
        blogPost: posts.map((p) => ({
          '@id': `${SITE_URL}/blog/${p.slug}/#post`,
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/blog/#itemlist`,
        numberOfItems: posts.length,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/blog/${p.slug}/`,
          name: p.en.title,
        })),
      },
    ],
  };
}

/**
 * Speakable subset for blog post: lead paragraph + speakable FAQs.
 * Voice assistants and AI engines pick up these blocks.
 */
export function generateBlogSpeakableSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: ['.speakable-lead', '.speakable-faq-answer'],
    xpath: [
      "//*[contains(@class, 'speakable-lead')]",
      "//*[contains(@class, 'speakable-faq-answer')]",
    ],
  };
}

/**
 * Breadcrumb for blog post: Home > Blog > Post Title.
 */
export function generateBlogBreadcrumbSchema(
  postTitle: string,
  postSlug: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/blog/${postSlug}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      {
        '@type': 'ListItem',
        position: 3,
        name: postTitle,
        item: `${SITE_URL}/blog/${postSlug}/`,
      },
    ],
  };
}

/**
 * FAQPage schema for a blog post's inline FAQs.
 */
export function generateBlogFAQSchema(
  post: BlogPostContent,
  locale: 'en' | 'es' = 'en'
): Record<string, unknown> {
  const loc = post[locale];
  const url = postUrl(post.slug, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faqpage`,
    isPartOf: { '@id': `${url}#post` },
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    dateModified: post.modifiedDate,
    mainEntity: loc.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
