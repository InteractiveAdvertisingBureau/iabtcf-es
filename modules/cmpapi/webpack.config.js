var webpack = require('webpack');
var path = require('path');

module.exports = [
	{
    
    entry: {
			'cmpapi': './lib/index.js'
		},
    
    output: {
			path: path.resolve(__dirname, 'build'),
			publicPath: './',
			filename: '[name].bundle.js'
		},
    
    context: path.resolve(__dirname, ''),
    
    resolve: {
      extensions: ['.js'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules'
      ],
    },
  
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
  
    stats: { colors: true },
  
    node: {
      global: true,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false
    },
  
    optimization: {
      minimize: true
    },

		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.ProvidePlugin({
				'Promise': 'promise-polyfill'
      })
    ]
    
	}
];
