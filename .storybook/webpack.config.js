const { resolve } = require('path')

const config = require('@rails/webpacker/package/config')
const environment = require('../config/webpack/environment')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.resolve.modules.unshift(resolve(config.source_path))
  return storybookBaseConfig
}
