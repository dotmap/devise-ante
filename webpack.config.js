const path = require('path')
const webpack = require('webpack')
const notifier = require('node-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDashboardPlugin = require('webpack-dashboard/plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
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
                scss: 'vue-style-loader!css-loader!sass-loader',
                sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
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
    },
    quiet: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new WebpackDashboardPlugin(),
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
    })
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
