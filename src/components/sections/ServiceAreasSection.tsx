import Link from 'next/link';
import { STATE_PAGES } from '@/data/states';

export const ServiceAreasSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
            Service Areas
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Serving 2 states across the United States — New York and California.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATE_PAGES.map((state) => (
            <div
              key={state.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col"
            >
              <Link
                href={`/states/${state.slug}`}
                className="font-outfit font-bold text-xl text-slate-900 hover:text-blue-600 transition mb-2"
              >
                {state.name}
              </Link>
              <p className="text-sm text-slate-500 mb-4">
                {state.cities.length} {state.cities.length === 1 ? 'city' : 'cities'} served
              </p>

              <ul className="flex flex-col gap-2 flex-1">
                {state.cities.map((c) =>
                  c.hasPage && c.slug ? (
                    <li key={c.name}>
                      <Link
                        href={`/cities/${c.slug}`}
                        className="text-slate-700 hover:text-blue-600 hover:underline text-sm transition"
                      >
                        {c.name}, {state.abbr}
                      </Link>
                    </li>
                  ) : (
                    <li key={c.name} className="text-slate-500 text-sm">
                      {c.name}, {state.abbr}
                      <span className="text-xs text-slate-400 ml-2">· coverage area</span>
                    </li>
                  )
                )}
              </ul>

              <Link
                href={`/states/${state.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-6"
              >
                View {state.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
