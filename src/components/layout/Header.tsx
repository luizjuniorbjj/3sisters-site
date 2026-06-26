'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/data/site';

export const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white transition-shadow duration-300',
        isScrolled && 'shadow-md'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/brand/logo.png"
              alt="3 Sisters Services"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'font-inter text-sm font-medium transition-colors duration-200 py-2 px-4 rounded-lg',
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {item.label}
                </Link>

                {/* Dropdown */}
                {item.sublinks && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {item.sublinks.map((sublink) => (
                      <Link
                        key={sublink.label}
                        href={sublink.href}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${siteConfig.site.phoneHref}`}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium"
            >
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {siteConfig.site.phone}
            </a>
            <Button variant="primary" size="md" href="/booking">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-slate-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col gap-2 pt-4">
              {siteConfig.nav.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-4 py-2 rounded-lg font-inter text-sm font-medium',
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-100'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.sublinks && (
                    <div className="ml-4 flex flex-col gap-1 mt-2">
                      {item.sublinks.map((sublink) => (
                        <Link
                          key={sublink.label}
                          href={sublink.href}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-3 px-4">
                <a
                  href={`tel:${siteConfig.site.phoneHref}`}
                  className="text-slate-600 text-sm font-medium"
                >
                  {siteConfig.site.phone}
                </a>
                <Button variant="primary" size="md" href="/booking" className="w-full">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
