import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  // Classes applied via dynamic data bindings (project gradients, news accents)
  // are not visible to the content scanner, so keep them explicitly.
  safelist: [
    'pill-leaf',
    'pill-steel',
    'pill-amber',
    'from-brand-steel',
    'from-brand-leaf',
    'from-brand-graphite',
    'from-brand-amber',
    'from-emerald-800',
    'to-brand-graphite',
    'to-brand-moss',
    'to-brand-steel',
    'to-brand-leaf',
    'to-brand-amber'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          graphite: '#0F1620',
          ink: '#1B2330',
          steel: '#1E5BBA',
          leaf: '#5DAA2F',
          moss: '#3D7A1D',
          forest: '#1E4D14',
          spring: '#EBF6DD',
          amber: '#F3A33A',
          cloud: '#F4F5F7',
          fog: '#E5E8ED',
          mist: '#C2C8D2'
        }
      },
      fontFamily: {
        display: ['Onest', 'Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }]
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,22,32,0.04), 0 8px 24px rgba(15,22,32,0.06)',
        'card-hover': '0 4px 12px rgba(15,22,32,0.08), 0 24px 48px rgba(15,22,32,0.12)',
        glow: '0 0 0 4px rgba(93,170,47,0.18)'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      backgroundImage: {
        'leaf-gradient': 'linear-gradient(135deg, #5DAA2F 0%, #F3A33A 100%)',
        'forest-gradient': 'linear-gradient(135deg, #3D7A1D 0%, #5DAA2F 100%)',
        'graphite-gradient': 'linear-gradient(180deg, #0F1620 0%, #1B2330 100%)'
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'leaf-glow': 'leafGlow 2.4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        leafGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(93,170,47,0.55)' },
          '50%': { boxShadow: '0 0 0 14px rgba(93,170,47,0)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: [forms, typography]
};
