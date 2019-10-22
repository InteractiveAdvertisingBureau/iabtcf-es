module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    'max-len': ['error', {
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
      'code': 120
    }],
    'no-multiple-empty-lines':['error', {'max':1, 'maxEOF':0, 'maxBOF':0}],
    'require-jsdoc': [0],
    'semi': ['error', 'always'],
    'padded-blocks': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/indent': ['error', 2],
    'indent': [
      'error', 2, {
        'ArrayExpression': 'first',
        'FunctionExpression': {'body': 1, 'parameters': 'first'},
        'ObjectExpression': 'first',
        'SwitchCase': 1,
        'CallExpression': {'arguments': 'first'},
      },
    ],
    'padding-line-between-statements': [
      'error',
      {'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var']},
      {'blankLine': 'always', 'prev': 'block-like',  'next': '*'},
      {'blankLine': 'always', 'prev': '*',  'next': 'block-like'},
    ],
    'new-cap': 'off',
  },
};
