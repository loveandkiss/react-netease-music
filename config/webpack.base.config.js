import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin'

const rootPath = process.cwd()

export default (env, argv) => {
  const isProd = argv.mode === 'production'

  const config = {
    entry: path.resolve(rootPath, 'src/index.tsx'),
    output: {
      // 因为开发环境中，chunkhash与HotModuleReplacementPlugin有冲突，所以两个环境分别设置
      filename: isProd ? '[name].[chunkhash:8].js' : '[name].[fullhash:8].js',
      path: path.resolve(rootPath, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      modules: [path.resolve(rootPath, 'src'), 'node_modules'],
      alias: {
        '@mui': path.resolve(rootPath, 'node_modules/@uniquemo/mui/esm/components'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'import',
                  {
                    libraryName: '@blueprintjs/core',
                    transformToDefaultImport: false,
                    customName: (name) => {
                      const BASE_PATH = `${rootPath}/node_modules/@blueprintjs/core/lib/esm`

                      const PATH_MAP = {
                        button: ['button', 'buttons'],
                        'input-group': ['forms', 'inputGroup'],
                        'menu-item': ['menu', 'menuItem'],
                        toaster: ['toast', 'toaster'],
                      }

                      if (name === 'position') {
                        return `${BASE_PATH}/common/position`
                      }

                      const info = PATH_MAP[name]
                      if (info) {
                        const [folder, filename] = info
                        return `${BASE_PATH}/components/${folder}/${filename}`
                      }

                      return `${BASE_PATH}/components/${name}/${name}`
                    },
                  },
                ],
              ],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          include: /node_modules/,
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // 定义全局常量，这对于在编译时注入环境变量或其他常量非常有用。
      new webpack.DefinePlugin({
        // 设置全局常量 process.env，将其定义为空对象 {}。这是为了解决一个问题，即在某些情况下，@blueprintjs 库可能会尝试访问 process.env，而在浏览器环境中通常没有该对象。通过将其定义为空对象，可以防止出现 "process is not defined" 错误。
        'process.env': '{}', // 临时修复@blueprintjs报错“process is not defined”
        // 定义了一个名为 __LOCALHOST__ 的全局常量，它的值取决于 process.env.LOCAL 是否等于字符串 'true'。这通常用于确定当前应用程序是否正在本地开发环境中运行。如果 process.env.LOCAL 等于 'true'，则 __LOCALHOST__ 的值将为 true，否则为 false。
        __LOCALHOST__: process.env.LOCAL === 'true',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(rootPath, 'src/index.html'),
        favicon: path.resolve(rootPath, 'favicon.ico'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },
  }
  return config
}
