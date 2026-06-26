import { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { Clock, Calendar } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { BLOG_POSTS } from '@/data/blog-posts';
import { generateBlogListingSchema } from '@/lib/blog-schema';

const BLOG_LISTING_SCHEMA = generateBlogListingSchema(BLOG_POSTS);

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Expert cleaning tips, hiring guides, and Airbnb host advice from a family-owned cleaning company in New York and California.',
  alternates: { canonical: 'https://3sistersservices.com/blog/' },
  openGraph: {
    title: 'Blog | 3 Sisters Services',
    description: 'Cleaning tips, hiring guides, and Airbnb host advice.',
    url: 'https://3sistersservices.com/blog/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={BLOG_LISTING_SCHEMA} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">OUR JOURNAL</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-3xl">
            Expert Cleaning{' '}
            <span className="text-blue-600">Tips &amp; Insights.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Practical tips, hiring guides, and Airbnb host playbooks from our
            family-owned team in New York and California.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => {
              const hasImage = ['how-to-prepare-for-deep-cleaning', 'hiring-cleaning-service-nyc', 'airbnb-cleaning-checklist'].includes(post.slug);
              return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <article>
                  {/* Image — only first 3 posts */}
                  {hasImage && (
                  <div className="aspect-[16/9] overflow-hidden bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover}
                      alt={post.en.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  )}

                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedDate)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {post.readMinutes} Min Read
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-outfit font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.en.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {post.en.description}
                    </p>
                  </div>
                </article>
              </Link>
              );
            })}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <Button variant="outline" size="md" href="/contact">
              Have a Question?
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
