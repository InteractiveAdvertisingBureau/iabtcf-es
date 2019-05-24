module.exports =  {
  parser:  '@typescript-eslint/parser',  
  extends:  [
    'plugin:@typescript-eslint/recommended',  
    'google',
  ],
 parserOptions:  {
    ecmaVersion:  2018,  
    sourceType:  'module',  
  },
  rules: {
    "@typescript-eslint/indent": ["error", 2],
    'max-len': ['error', {'code':120}],
    'require-jsdoc':[0],
    'padded-blocks': ['error', 'always'],
    'indent': [
      'error', 2, {
        'ArrayExpression': "first",
        'FunctionExpression': {'body':1, 'parameters':"first"},
        'ObjectExpression': 1, 
        'SwitchCase': 1, 
        'CallExpression': {'arguments': 'first'}
      }
    ],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*'},
      { 'blankLine': 'any',    'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var']}
    ]
  }
};
