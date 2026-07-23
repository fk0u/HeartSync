/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bp: {
          normal: {
            DEFAULT: '#10b981',
            light: '#d1fae5',
            dark: '#065f46',
            text: '#047857'
          },
          elevated: {
            DEFAULT: '#f59e0b',
            light: '#fef3c7',
            dark: '#92400e',
            text: '#d97706'
          },
          stage1: {
            DEFAULT: '#f97316',
            light: '#ffedd5',
            dark: '#9a3412',
            text: '#c2410c'
          },
          stage2: {
            DEFAULT: '#ef4444',
            light: '#fee2e2',
            dark: '#991b1b',
            text: '#b91c1c'
          },
          crisis: {
            DEFAULT: '#be123c',
            light: '#ffe4e6',
            dark: '#881337',
            text: '#9f1239'
          }
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0a3651',
        },
        health: {
          teal: '#0d9488',
          emerald: '#10b981',
          cyan: '#06b6d4',
          sky: '#0284c7'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
