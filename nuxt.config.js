export default {
  ssr: false,
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    host: '0.0.0.0',
    port: '3000',
  },
  head: {
    title: 'fe-ts',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/main.css',
    'material-icons/iconfont/material-icons.css',
  ],

  tailwindcss: {
    jit: true,
    cssPath: '~/assets/scss/tailwind.scss',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vee-validate.js', '~/plugins/apollo-client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/apollo',
    '@nuxtjs/composition-api/module',
  ],

  apollo: {
    clientConfigs: {
      default: '~/graphql/client-options',
    },
  },

  fontawesome: {
    icons: {
      solid: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/dayjs',
  ],

  dayjs: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    defaultTimeZone: 'Thailand',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
      'localizedFormat', // import 'dayjs/plugin/localizedFormat'
    ],
  },

  sweetalert: {},

  toast: {
    position: 'bottom-center',
    theme: 'bubble',
    duration: 3000,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    credentials: true,
    // proxy: true,
  },
  // proxy: {
  //   '/api/': {
  //     target: process.env.API_BASE_URL + '/api',
  //     pathRewrite: { '^/api/': '' },
  //   },
  // },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        // scheme: '~/schemes/auto-refresh-token.js',
        token: {
          property: 'token',
          maxAge: 10,
          type: 'Bearer',
        },
        user: {
          property: 'data',
          autoFetch: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'POST' },
          refresh: { url: '/auth/refresh_token', method: 'POST' },
          user: { url: '/auth/me', method: 'GET' },
          logout: false,
        },
      },
    },
    redirect: false,
    // redirect: {
    //   login: '/login',
    //   logout: '/',
    //   callback: '/',
    //   home: '/dashboard',
    // },
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate', '@vue/apollo-composable'],
    postcss: {
      plugins: {
        'postcss-easy-import': { prefix: '_', extensions: ['.css', '.scss'] },
        'postcss-nested': {},
      },
    },
    // build: {
    //   extend(config, { isDev, isClient }) {
    //     config.node = {
    //       fs: 'empty',
    //     };

    //     // ....
    //   },
    // },
  },
};
