const path = require('path');// eslint-disable-line

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'vendorlist')],
    },
  },
};
