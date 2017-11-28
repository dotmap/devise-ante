const path = require('path')
const webpack = require('webpack')
const notifier = require('node-notifier')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackDashboardPlugin = require('webpack-dashboard/plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                scss: ExtractTextPlugin.extract({
                  use: ['css-loader', 'postcss-loader', 'sass-loader'],
                  fallback: 'vue-style-loader'
                })
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]',
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: ['node_modules'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    port: 3000,
    noInfo: true,
    historyApiFallback: {
      index: '/dist/'
    }
  },
  devtool: '#eval-source-map',
  plugins: [
    new ExtractTextPlugin({
      disable: process.env.NODE_ENV !== 'production',
      filename: 'styles.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: process.env.NODE_ENV === 'production' ? 'Devise' : 'Devise Dev'
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          'Hooray! The build was successful.',
          'The local development url is http://localhost:3000'
        ],
        notes: [
          'This build is not optimized for production.',
          'To create a production build, run `npm run build`'
        ]
      },
      onErrors: (severity, errors) => {
        if (severity === 'error') {
          const error = errors[0]
          const message = error.message.match(/(^.*)/)
          notifier.notify({
            title: `Error in ${error.file}`,
            message: message[0]
          })
        }
      }
    }),
    new WebpackDashboardPlugin()
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new MinifyPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ])
}
