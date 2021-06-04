
//const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/staticfiles/dist/' // This is whatever your path from the root is
    : 'http://127.0.0.1:8080',
  outputDir: '../backend/staticfiles/dist/', // currently in dist folder
  indexPath: '../../frontend/public/index.html',
  css: {extract: false},
  chainWebpack: config => {
    config
      .plugin('BundleTracker')
        .use(BundleTracker, [{ filename: './webpack-stats.json' },])
        .delete('prefetch', 'preload') // remove headers and tags you'd like to avoid.
        .end()
    config.optimization
      .splitChunks(false)

    config.resolve.alias
      .set('__STATIC__', 'static') //  <img src="~__STATIC__/logo.png">

    config.devServer
      .proxy({
          '/v1': {
              target: 'http://localhost:5000',
              changeOrigin: true,
              pathRewrite: {
                  '^/v1': ''    // removes api from http://localhost:8080/api/items.
              }
          }/* ,
          '/v2': {
              target: 'https://loclhost:4437',
              changeOrigin: true,
              pathRewrite: {
                  '^/v2': ''
              }
          } */


      })
    // .public('http://0.0.0.0:8080')
      .public('http://127.0.0.1:8080')
    // .contentBase(path.resolve(__dirname, 'public') )
      .host('127.0.0.1')
      .port(8080)
      .hotOnly(true)
      .watchOptions({ poll: 1000 })
      .https(false)
      .disableHostCheck(true)
      .clientLogLevel('warning')
      .inline(true)
      .historyApiFallback(true)
      .writeToDisk(filePath => filePath.endsWith('index.html')) // Write files to disk in dev mode, so Django can serve the assets
      .headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, content-type, Authorization'
      })

    config.module.rule('eslint').use('eslint-loader')
  }
}
