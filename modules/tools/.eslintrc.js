module.exports = {
  env: {
    node: true
  },
  'extends': [
    '../../.eslintrc.js',
    'plugin:vue/essential',
    '@vue/typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
