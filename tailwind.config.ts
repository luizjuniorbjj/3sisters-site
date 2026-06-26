import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        dark: '#0F172A',
        muted: '#64748B',
        border: '#E2E8F0',
        surface: '#F8FAFC',
        'surface-alt': '#F1F5F9',
        accent: {
          green: { DEFAULT: '#03543F', light: '#DEF7EC', lighter: '#D1FAE5' },
          red: { DEFAULT: '#991B1B', light: '#F8E4E4' },
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['76px', { lineHeight: '1.05', fontWeight: '700' }],
        'h1': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['48px', { lineHeight: '1.15', fontWeight: '700' }],
        'h3': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h5': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.6' }],
        'body': ['18px', { lineHeight: '1.6' }],
        'body-sm': ['16px', { lineHeight: '1.5' }],
        'caption': ['14px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'btn': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.08)',
        'nav': '0 2px 10px rgba(0,0,0,0.06)',
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        'container': '1280px',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
