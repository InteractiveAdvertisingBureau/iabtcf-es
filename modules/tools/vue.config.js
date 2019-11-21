const path = require('path');// eslint-disable-line

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, '/dist/'),
  filenameHashing: false,
  configureWebpack: {
    devServer: {
      contentBase: [path.join(__dirname, 'dist')],
    },
  },
};
