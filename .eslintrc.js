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
    'plugin:nuxt/essential'
    // '@nuxtjs'
  ],
  // add your custom rules here
  rules: {}
}
