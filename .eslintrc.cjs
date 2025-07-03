module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:json/recommended',
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      // This with eslint-import-resolver-typescript allow use '.js' suffix in exports to allow ESM work also in browser
      "typescript": {
        "alwaysTryTypes": true,
      },
    }
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/no-cycle': ['error', { maxDepth: 1 }],
    'import/namespace': 0,
    'max-len': 0,
    'no-multiple-empty-lines':['error', {'max':1, 'maxEOF':0, 'maxBOF':0}],
    'require-jsdoc': [0],
    'semi': ['error', 'always'],
    'padded-blocks': ['error', 'always'],
    'no-console': 'error',
    'no-debugger': 'error',
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
      {'blankLine': 'always', 'prev': '*',  'next': 'class'},
      {'blankLine': 'always', 'prev': '*',  'next': 'function'},
      {'blankLine': 'always', 'prev': 'block-like',  'next': '*'},
      {'blankLine': 'always', 'prev': '*',  'next': 'block-like'},
    ],
    'new-cap': 'off'
  },
};
