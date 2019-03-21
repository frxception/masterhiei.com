const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const pkg = require('./package');

// Apply enviroment variables
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: `Master Hiei's Blog`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+SC:300,400,500,700&amp;subset=chinese-simplified,japanese',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
        integers:
          'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
        crossOrigin: 'anonymous',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~assets/style/app'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vuetify',
    '~plugins/vueScrollTo',
    '~plugins/veeValidate',
    { src: '~plugins/vueLazyLoad', ssr: false },
  ],

  generate: {
    routers: ['/about', '/ja-JP/about'],
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
    [
      'nuxt-i18n',
      {
        vueI18n: {
          dateTimeFormats: require('./assets/locales/dateTimeFormats'),
          fallbackLocale: 'zh-CN',
        },
        vueI18nLoader: true,
        locales: [
          {
            code: 'zh-CN',
            name: '简体中文',
            iso: 'zh-CN',
            file: 'zh_CN.js',
          },
          {
            code: 'ja-JP',
            name: '日本語',
            iso: 'ja-JP',
            file: 'ja.js',
          },
        ],
        defaultLocale: 'zh-CN',
        lazy: true,
        langDir: 'assets/locales/',
      },
    ],
    '@nuxtjs/markdownit',
  ],

  /*
   ** Nuxt Auth modules
   */
  auth: {
    plugins: ['~plugins/auth'],
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `/login`,
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: `/logout`,
            method: 'post',
          },
          user: {
            url: `/users/me`,
            method: 'get',
            propertyName: 'user',
          },
        },
      },

      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['read:user'],
      },
    },
  },

  markdownit: {
    injected: true,
    preset: 'default',
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables'],
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    analyze: {
      analyzerMode: 'server',
    },
  },
};
