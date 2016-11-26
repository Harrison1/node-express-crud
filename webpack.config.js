const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/react-app/index.html',
  filename: 'index.html'
});

module.exports = {
  entry: [
    './react-app/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, 
        include:  __dirname + '/react-app',
        loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
      }
    ]
  },
  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [    
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new HtmlWebpackPlugin({ template: __dirname + '/react-app/index.html', filename: 'index.html'})
    ]
}


// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');

// module.exports = {
//   entry: './react-app/index.js',
//    output: {
//     path: __dirname + './dist',
//     filename: 'index_bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/, 
//         include:  __dirname + '/react-app',
//         use: 'babel?presets[]=es2015'
//       }
//     ]
//   },
//   plugins: [
//   new webpack.optimize.UglifyJsPlugin(),
//   new HtmlWebpackPlugin({template: './dist/index.html'})
//   ]
// }