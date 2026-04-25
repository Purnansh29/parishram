/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#f8fafc',
        bgSecondary: '#ffffff',
        bgCard: 'rgba(255, 255, 255, 0.9)',
        bgGlass: 'rgba(255, 255, 255, 0.6)',
        accentPrimary: '#4f46e5',
        accentSecondary: '#818cf8',
        accentWarm: '#f43f5e',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        textMuted: '#94a3b8',
        borderColor: 'rgba(15, 23, 42, 0.1)',
        borderHover: 'rgba(79, 70, 229, 0.3)',
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
