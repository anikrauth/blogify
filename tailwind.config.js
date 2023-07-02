/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary_color': '#f67280',
        'secondary_color': '#131315',
        'author_color': '#444444',
        'text_color': '#94979e',
        'white_color': '#ffffff',
        'black_color': '#000000',
        'dark_header_color': '#191919',
        'dark_bg_color': '#212121',
        'light_bg_color': '#F9F9FF',
        'dark_posts_bg_color': '#171717',
        'category_bg_color': '#F9F9FF',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
// #FA5005
// #f67280