/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': { 'min': '300px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '991px' },
      'lg': { 'min': '992px', 'max': '1199px' },
      'xl': { 'min': '1200px' },
    },
    colors: {
      'white': 'rgb(255 255 255)',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'red': '#C81E1E',
      'red-500': '#ef4444',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-50': '#f9fafb',
      'gray-100': '#f3f4f6',
      'gray-200': '#e5e7eb',
      'gray-300': '#d1d5db',
      'gray-400': '#9ca3af',
      'gray-500': '#6b7280',
      'gray-600': '#4b5563',
      'gray-700': '#374151',
      'gray-800': '#1f2937',
      'gray-900': '#111827',
      'gray-950': '#030712',
      'gray-light': '#d3dce6',
      'blue-50': 'rgb(239 246 255)',
      'blue-100': 'rgb(219 234 254)',
      'blue-200': 'rgb(191 219 254)',
      'blue-300	': 'rgb(147 197 253)',
      'blue-400': 'rgb(96 165 250)',
      'blue-500': 'rgb(59 130 246)',
      'blue-600	': 'rgb(37 99 235)',
      'blue-700': 'rgb(29 78 216)',
      'blue-800': 'rgb(30 64 175)',
      'blue-900': 'rgb(30 58 138)',
      'blue-950': 'rgb(23 37 84)',
      'emerald-50': 'rgb(236 253 245)',
      'emerald-100': ' rgb(209 250 229',
      'emerald-200': ' rgb(167 243 208',
      'emerald-300': ' rgb(110 231 183',
      'emerald-400': ' rgb(52 211 153)',
      'emerald-500': ' rgb(16 185 129)',
      'cyan-500': 'rgb(6 182 212)',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      boxShadow: {
        'material': 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}