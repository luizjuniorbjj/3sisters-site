import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBlogPost, getAllBlogSlugs } from '@/data/blog-posts';
import {
  generateArticleSchema,
  generateBlogBreadcrumbSchema,
  generateBlogFAQSchema,
  generateBlogSpeakableSchema,
} from '@/lib/blog-schema';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import { SERVICE_CITY_PAGES } from '@/data/service-city';
import { getCityBySlug } from '@/data/cities';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  const url = `https://3sistersservices.com/blog/${post.slug}/`;
  return {
    title: post.en.title,
    description: post.en.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.en.title,
      description: post.en.description,
      url,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author.name],
      images: [
        // PATCH PRÉ-CUTOVER: cover served from live Pages host (canonical/url stay on final domain). Revert after cutover.
        { url: `https://3sisters-site.pages.dev${post.cover}`, alt: post.en.title },
      ],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const articleSchema = generateArticleSchema(post, 'en');
  const faqSchema = generateBlogFAQSchema(post, 'en');
  const speakableSchema = generateBlogSpeakableSchema();
  const breadcrumbSchema = generateBlogBreadcrumbSchema(post.en.title, post.slug);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={speakableSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Badge variant="primary" className="mb-5">
            {post.category}
          </Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-6 leading-tight">
            {post.en.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>By {post.author.name}</span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedDate)}
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt={post.en.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Lead paragraph (speakable) */}
          <p className="speakable-lead text-lg text-slate-700 leading-relaxed mb-10 font-medium">
            {post.en.leadParagraph}
          </p>

          {/* Sections */}
          {post.en.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-4">
                {section.heading}
              </h2>
              <div
                className="text-slate-600 leading-relaxed [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4 [&_li]:leading-relaxed [&_strong]:text-slate-900 [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            </section>
          ))}

          {/* Closing CTA */}
          <div
            className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-2xl text-slate-700 leading-relaxed [&_a]:text-blue-700 [&_a]:font-semibold [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.en.closingCta }}
          />
        </div>
      </article>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {post.en.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3
                    className="font-outfit font-semibold text-lg text-slate-900 pr-4"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  <span className="text-blue-600 text-2xl shrink-0 group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div
                  className={`px-6 pb-6 text-slate-600 leading-relaxed${faq.speakable ? ' speakable-faq-answer' : ''}`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{faq.answer}</span>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas — onde oferecemos este serviço */}
      {(() => {
        const cityPages = SERVICE_CITY_PAGES.filter(
          (sc) => sc.serviceSlug === post.serviceSlug
        );
        const citySlugs = cityPages
          .map((sc) => sc.citySlug)
          .filter((slug, i, arr) => arr.indexOf(slug) === i);
        if (citySlugs.length === 0) return null;
        return (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-6 text-center">
                Available in your area
              </h2>
              <p className="text-lg text-slate-600 text-center mb-8">
                We offer {post.en.title.toLowerCase()} in the following cities:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {citySlugs.map((slug) => {
                  const city = getCityBySlug(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/cities/${slug}/${post.serviceSlug}/`}
                      className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-600 hover:shadow-sm transition text-center"
                    >
                      <span className="font-outfit font-semibold text-lg text-slate-900">
                        {city?.name || slug}
                      </span>
                      <span className="text-sm text-slate-500 block mt-1">
                        {city?.stateAbbr || ''}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Link
                  href={`/services/${post.serviceSlug}/`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View our {post.serviceSlug.split('-').join(' ')} service →
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      <CTASection />
    </>
  );
}
