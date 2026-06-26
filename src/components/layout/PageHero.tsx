import { Badge } from '@/components/ui/Badge';

interface PageHeroProps {
  badge: string;
  title: string;
  highlightWord?: string;
  description?: string;
  stats?: Array<{ label: string; value: string }>;
}

export const PageHero = ({
  badge,
  title,
  highlightWord,
  description,
  stats,
}: PageHeroProps) => {
  const renderTitle = () => {
    if (!highlightWord) return title;

    const parts = title.split(new RegExp(`(${highlightWord})`, 'i'));
    return (
      <>
        {parts.map((part, i) => (
          <span
            key={i}
            className={part.toLowerCase() === highlightWord.toLowerCase() ? 'text-blue-600' : ''}
          >
            {part}
          </span>
        ))}
      </>
    );
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 justify-center">
          {badge}
        </Badge>

        <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-slate-900 mb-6">
          {renderTitle()}
        </h1>

        {description && (
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-200">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="font-outfit font-bold text-3xl text-blue-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
