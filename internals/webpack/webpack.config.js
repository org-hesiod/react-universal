const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'ui-react': './source/components/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    library: 'react-universal-ui',
    libraryTarget: 'umd',
    filename: '[name].web.min.js'
  },
  externals: {
    react: 'react',
  },
  resolve: {
    extensions: ['.web.js', '.js', '.scss']
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.web.js$/,
        exclude: /(node_modules| )/,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.web.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: true,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: path.resolve(__dirname, './config/postcss.config.js')
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }),
        include: path.resolve(__dirname, '../source/')
      },
      {
        test: /\.(jpe?g|jpg|gif|ico|png|woff|woff2|eot|ttf)$/,
        include: path.resolve(__dirname, '../source/'),
        exclude: /(node_modules)/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false
    }),
    new ExtractTextPlugin(`[name].min.css`, {
      allowChunks: true
    })
  ]
};
