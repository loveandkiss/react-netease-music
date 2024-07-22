import webpack from 'webpack'

export default {
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          'style-loader', // CSS的HMR需要使用style-loader
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        include: /src/,
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],

  // 开发时本地服务器相关配置
  devServer: {
    contentBase: './dist', // 告诉服务器从哪个目录中提供内容。
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。devServer.historyApiFallback 默认禁用。
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
      '/graphql': {
        // 服务器目标地址
        target: 'http://localhost:4000',
      },
    },
  },
}
