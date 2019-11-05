const path = require('path');// eslint-disable-line

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, '../../docs/'),
  configureWebpack: {
    devServer: {
      contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'vendorlist')],
    },
  },
};
