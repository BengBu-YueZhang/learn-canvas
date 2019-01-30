var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var HappyPack = require('happypack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
  devtool: 'false',

  mode: 'production',

  target: 'web',

  entry: {
    main: path.resolve(__dirname, './index.js')
  },

  output: {
    path: path.resolve(__dirname, `./dist`),
    filename: './static/js/[name].[chunkhash].js',
    chunkFilename: './static/js/[name].[chunkhash].chunk.js'
  },

  resolve: {
    extensions: ['.js']
  },

  optimization: {
    minimizer: [
      // js压缩
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      // css压缩
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ],

    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // 第三方模块
        vendor: {
          name: 'vendors-chunk',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 20  
        },
        // 公共的模块
        common: {
          name: 'common-chunk',
          chunks: 'all',
          minChunks: 2,
          test: path.resolve(__dirname, './../src/components'),
          priority: 10,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: './static/img/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: './static/font/[name].[hash].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HappyPack({
      id: 'js',
      threads: 4,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `./dist/index.html`),
      template: path.resolve(__dirname, './public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: './static/css/[contenthash].css'
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    // chunk长效缓存
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      return Array.from(chunk.modulesIterable, m => m.id).join("_");
    }),
    new BundleAnalyzerPlugin()
  ]
}