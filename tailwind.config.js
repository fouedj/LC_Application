/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./App/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        warmGray: colors.warmGray,
        trueGray: colors.trueGray,
        coolGray: colors.coolGray,
        blueGray: colors.blueGray,
        lightNature: '#FFFFFFBF',
        Dark_Grey: '#757575',
        backgroundLine: '#D9D9D9',
        textDeal: '#50BF90',
        backgroundDeal: '#D3EFE3',
        blackPro: '#1C1C1C',
        bgBadge: '#EDEEFE',
      },
    },
  },
  plugins: [
    plugin(function ({addComponents}) {
      addComponents({
        '.backgroundOpacity': {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        '.activityIndicator': {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        '.elevation': {
          elevation: 10,
        },
      });
    }),
  ],
};
