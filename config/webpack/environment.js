const { environment } = require('@rails/webpacker')

const erb =  require('./loaders/erb')
environment.loaders.append('erb', erb)

const WebpackAssetsManifest = require('webpack-assets-manifest')
// environment.splitChunks()

module.exports = environment
