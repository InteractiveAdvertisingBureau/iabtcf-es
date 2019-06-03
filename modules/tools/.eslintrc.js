/* eslint-disable */
module.exports = {
  env: {
    node: true,
  },
  extends: [
    '../../.eslintrc.js',
    'plugin:vue/essential',
  ],
  rules: {
    'new-cap': ['error',
      { 'capIsNewExceptions': 
        [ '@Component',
          '@Prop',
          '@Model',
          '@Watch',
          '@Inject',
          '@Provide',
          '@Emit',
        ],
      },
    ],
  },
};
