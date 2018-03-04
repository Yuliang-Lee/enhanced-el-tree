const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve("dist"),
    filename: 'enhanced-el-tree.js',
    library: 'EnhancedElTree',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          fix: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,

      },
      {
        test: /\.js$/,
        include: [
          resolve("src"),
          resolve('node_modules/element-ui')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  // plugins: [
  //   new UglifyJsPlugin({
  //     parallel: true,
  //     uglifyOptions: {
  //       ecma: 8,
  //     }
  //   })
  // ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  externals: {
    'vue': 'vue',
    'element-ui': 'element-ui'
  }
};