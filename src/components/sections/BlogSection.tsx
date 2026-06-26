import Link from 'next/link';
import { siteConfig } from '@/data/site';

export const BlogSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">
            Our Journal
          </p>
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
            Expert Cleaning Tips & Insights.
          </h2>
          <p className="text-lg text-slate-600">
            Stay informed with our latest articles on cleaning best practices, home care tips,
            and industry insights.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {siteConfig.blog.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-200"
            >
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden relative bg-slate-50">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-full h-full" />
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-slate-600">{post.date}</span>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-600">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-outfit font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>

                {/* Read More Link */}
                <div className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all duration-200">
                  Read Full Story
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Articles
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
