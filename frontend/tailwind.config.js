/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:  '#10b981',   // emerald-500  — terminal green
        accent:   '#34d399',   // emerald-400  — lighter green
        dim:      '#059669',   // emerald-600  — darker green for depth
        dark:     '#0a0a0a',   // near-black
        surface:  '#111111',   // slightly lifted black
        card:     '#161616',   // card background
        border:   '#222222',   // very subtle border
        muted:    '#4b5563',   // gray-600
        subtle:   '#1f1f1f',   // hover surfaces
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'blink':      'blink 1s step-end infinite',
        'scan':       'scan 4s linear infinite',
        'fade-in':    'fadeIn 0.4s ease-out both',
        'slide-up':   'slideUp 0.5s ease-out both',
        'spin-slow':  'spin 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
