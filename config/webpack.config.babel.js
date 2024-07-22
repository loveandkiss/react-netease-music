/**
 * webpack配置文件
 * 导出函数
 * 官方文档：https://webpack.docschina.org/configuration/configuration-types/#exporting-a-function
 */
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config'
import devConfig from './webpack.dev.config'
import prodConfig from './webpack.prod.config'

export default (env, argv) => {
  // 1. 区分开发和生产环境
  let config = argv.mode === 'development' ? devConfig : prodConfig
  // 2. 合并webpack配置
  return merge(baseConfig(env, argv), config)
}
