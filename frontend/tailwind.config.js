/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0A2540',
          blue: '#1E40AF',
          gold: '#D97706',
          emerald: '#059669',
          amber: '#F59E0B',
          slate: '#0F172A',
          card: '#1E293B',
          light: '#F8FAFC',
          border: '#E2E8F0',
          accent: '#2563EB',
          saffron: '#FF9933',
          indiaGreen: '#138808'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'gov': '0 4px 20px -2px rgba(10, 37, 64, 0.15)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.4)'
      }
    },
  },
  plugins: [],
}
