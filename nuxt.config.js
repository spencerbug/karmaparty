const env = require("dotenv").config();

module.exports = {
  // mode: 'spa',
  mode: 'universal',
  env: env.parsed,

  srcDir: "src",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        // for icon fonts
        rel: 'stylesheet',
        href: '/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href: '/styles.css'
      },
    ],
    script: [{
      src: '/util.js',
      type: 'text/javascript'
    }]
  },

  // sass style resouces
  styleResources: {
    scss: [
      'assets/bulma.scss',
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    'vue-croppa/dist/vue-croppa.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vee-validate',
    '@/plugins/vue-swal',
    '@/plugins/vue-croppa',
    '@/plugins/filters',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    ['vue-warehouse/nuxt',
      {
        vuex: true,
        plugins: [
          'store/plugins/expire',
          'store/plugins/defaults'
        ],
        storages: [
          'store/storages/localStorage',
          'store/storages/cookieStorage'
        ]
      }
    ],
  ],
  /*
   ** Build configuration
   */
  buildDir: 'functions/.nuxt',
  build: {
    publicPath: '/public/',
    babel: {
      babelrc: false,
      cacheDirectory: undefined,
      presets: ["@babel/preset-env"]
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}