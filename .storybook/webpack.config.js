const { resolve } = require('path')

const config = require('@rails/webpacker/package/config')
const environment = require('../config/webpack/environment')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.resolve.modules.unshift(resolve(config.source_path))

  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: resolve(__dirname, "../")
  })

  return storybookBaseConfig
}
