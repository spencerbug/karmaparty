module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // 'plugin:nuxt/recommended'
    'plugin:nuxt/base'
    // '@nuxtjs'
  ],
  // add your custom rules here
  rules: {}
}
