import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  safelist: [
    'text-[#34d399]', // green
    'text-[#fbbf24]', // amber
    'text-[#a78bfa]', // violet
    'text-[#f472b6]', // pink
    'text-[#facc15]', // yellow
    'text-[#fb923c]', // orange
    'text-[#2dd4bf]', // teal
    'text-[#e879f9]', // fuchsia
    'text-[#84cc16]', // lime
    'text-[#14b8a6]', // cyan
  ],
  plugins: [forms],
};
