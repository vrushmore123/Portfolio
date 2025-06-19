/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md2': '872px',
        '3xl': '1600px'
      },
      fontSize: {
        'title': ['clamp(3rem, 14vw, 9rem)'],
        'heading-display': ['clamp(4rem, 12vw, 8rem)', { lineHeight: '0.8', letterSpacing: '-0.04em' }],
        'heading-1': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'heading-1--alt': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.9' }],
        'heading-2': ['clamp(2rem, 6vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'heading-3': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-4': ['clamp(1.25rem, 3vw, 2rem)', { lineHeight: '1.2' }],
        'heading-5': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.3' }],
        'heading-body': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.4' }],
        'base': ['16px', { lineHeight: '1.5' }],
        'base-large': ['18px', { lineHeight: '1.5' }],
        'base-small': ['14px', { lineHeight: '1.4' }],
        'special': ['clamp(2rem, 4vw, 3.25rem)'],
        'works-title': ['clamp(1.25rem, 2vw, 1.5rem)'],
        'body-1': ['clamp(1.1rem, 2vw, 1.3rem)'], 
        'body-2': ['clamp(1rem, 1.5vw, 1.5rem)'],
        'body-3': '1.1rem',
        'body-4': ['clamp(0.75rem, 3vw, 1rem)'],
      },
      letterSpacing: {
        'headings': '-0.03em',
        'heading': '-0.025em',
        'body': '-0.01em',
        'mono': '0.05em',
        'base': '0'
      },
      lineHeight: {
        'tighter': '0.8',
        'tight': '0.9',
        'snug': '1.1',
        'base': '1.4',
        'relaxed': '1.6'
      },
      fontFamily: {
        'general': ['GeneralSans-Variable', 'sans-serif'],
        'grotesk': ['CabinetGrotesk-Variable', 'sans-serif'],
        'montreal': ['var(--font-montreal)', 'system-ui', 'sans-serif']
      },
      colors: {
        'transparent': 'transparent',
        'primary-200': '#F2F2F2',
        'primary-300': '#E6E6E6',
        'primary-400': '#D9D9D9',
        'secondary-50': '#94A3B8',
        'secondary-75': '#64748B',
        'secondary-100': '#475569',
        'secondary-200': '#334155',
        'secondary-300': '#1E293B',
        'secondary-400': '#0F172A',
        'secondary-500': '#AEAE9D',
        'secondary-600': '#8C8C73',
        'secondary-700': '#70705C',
        'accent-200': '#F8FAFB',
        'accent-400': '#131311',
        'accent-500': '#E2E8F0',
        'accent-600': '#CBD5E1',
        'accent-300': '#262626',
        'accent-100': '#666666',
      },
      spacing: {
        'space-3xs': '0.0625rem',
        'space-2xs': '0.125rem', 
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
        'space-2xl': '3rem',
        'fluid': 'clamp(1rem, 3vw, 2rem)'
      },
      gap: {
        'fluid': 'clamp(1rem, 3vw, 2rem)',
        'x-fluid': 'clamp(1rem, 3vw, 2rem)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)'
      }
    }
  },
  plugins: [],
}