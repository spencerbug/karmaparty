module.exports = {
    buildDir: 'ssr',
    dev: false,
    debug: true,
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
        }]
    },
    // plugins: [
    //     '@/plugins/vee-validate',
    //     '@/plugins/vue-swal',
    //     '@/plugins/vue-croppa',
    //     '@/plugins/filters',
    // ],
    /*
     ** Nuxt.js modules
     */
    // modules: [
    //     '@nuxtjs/eslint-module',
    //     '@nuxtjs/style-resources',
    //     '@nuxtjs/toast',
    //     ['vue-warehouse/nuxt',
    //         {
    //             vuex: true,
    //             plugins: [
    //                 'store/plugins/expire',
    //                 'store/plugins/defaults'
    //             ],
    //             storages: [
    //                 'store/storages/localStorage',
    //                 'store/storages/cookieStorage'
    //             ]
    //         }
    //     ],
    // ],
    // build: {
    //     extend(config, {
    //         isDev,
    //         isClient,
    //         isServer
    //     }) {
    //         if (isServer) {
    //             config.externals = {
    //                 '@firebase/app': 'commonjs @firebase/app',
    //                 '@firebase/firestore': 'commonjs @firebase/firestore',
    //                 '@firebase/database': 'commonjs @firebase/database',
    //                 '@firebase/storage': 'commonjs @firebase/storage',
    //             }
    //         }
    //     }
    // }
}