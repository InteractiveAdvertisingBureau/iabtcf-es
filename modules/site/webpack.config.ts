import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as VueLoaderPlugin from 'vue-loader';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';

interface WebpackConfig extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}

const config: WebpackConfig = {
  entry: './src/main.ts',
  output: {
    filename: `site.js`,
    path: path.resolve(__dirname, '../../docs'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [/node_modules\/\@iabtcf\/core/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [
                '\\.vue$',
              ],
            },
          },
        ],
      }, 
      {
        test: /\.(s*)css$/, // match any .scss or .css file,
        include: [
          path.resolve(__dirname, './src/'),
          path.resolve(__dirname, '../../node_modules/'),
        ],
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src/'),
      'vue$': 'vue/dist/vue.min.js',
      'vuex$': 'vuex/dist/vuex.min.js',
      'css-vars-ponyfill$': 'css-vars-ponyfill/dist/css-vars-ponyfill.min.js',
    },
    extensions: [
      '.json',
      '.ts',
      '.vue',
      '.js',
    ],
  },
  plugins: [
    new VueLoaderPlugin.VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title:'iabtcf: IAB TCF Code Library',
      template: './src/index.html',
    }),
  ],
};

const isDevServer = process.argv.find((v): boolean => v.includes('webpack-dev-server'));

if (isDevServer) {

  config.mode = 'development';
  config.devtool = 'eval-source-map';
  config.devServer = {
    contentBase: '../../docs/',
    hot: true,
    open: 'chrome',
    overlay: true,
    watchContentBase: true,
  };

} 

export default config;
