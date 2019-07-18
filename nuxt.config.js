export default {
  // mode: 'spa',
  mode: 'universal',
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
    sass: [
      // '/bulma.css',
      'assets/bulma/bulma.sass'
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vee-validate'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
