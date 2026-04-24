/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0a0a12',
        bgSecondary: '#111122',
        bgCard: 'rgba(255, 255, 255, 0.04)',
        bgGlass: 'rgba(255, 255, 255, 0.06)',
        accentPrimary: '#6c5ce7',
        accentSecondary: '#a29bfe',
        accentWarm: '#fd79a8',
        textPrimary: '#f0f0f8',
        textSecondary: '#a0a0b8',
        textMuted: '#6c6c80',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderHover: 'rgba(108, 92, 231, 0.4)',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #6c5ce7, #a29bfe, #fd79a8)',
      },
      animation: {
        'float-glow': 'float-glow 8s ease-in-out infinite alternate',
        'float-glow-reverse': 'float-glow 10s ease-in-out infinite alternate-reverse',
        'fade-in-up': 'fade-in-up 0.8s ease backwards',
      },
      keyframes: {
        'float-glow': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 30px)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
