const tokenPreset = require('gus-ui-tokens/tailwind.preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tokenPreset],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
