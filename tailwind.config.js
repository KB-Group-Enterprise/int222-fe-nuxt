module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
      height: {
        '30rem': '30rem',
        '35rem': '35rem',
      },
    },
  },
  variants: {
    animation: ['motion-safe', 'motion-reduce'],
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'dark',
      {
        mytheme: {
          primary: '#1C1C1E',
        },
      },
    ],
  },
};
