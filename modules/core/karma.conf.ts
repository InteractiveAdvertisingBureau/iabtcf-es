/* eslint-disable */
module.exports = (config): void => {

  config.set({
    frameworks: ['mocha', 'karma-typescript'],
    files: [
      'src/**/*.ts',
      'test/**/*.ts',
    ],
    preprocessors: {
      '**/*.ts': 'karma-typescript', // *.tsx for React Jsx
    },
    reporters: ['progress', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
  });

};
