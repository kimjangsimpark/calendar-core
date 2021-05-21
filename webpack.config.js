const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const PATH = {
  SRC: path.resolve(__dirname, './src'),
};

function publicPathResolver(resourcePath, context) {
  const relativePath = path.relative(path.dirname(resourcePath), context);
  const posixPath = relativePath.split(path.win32.sep).join(path.posix.sep);
  return posixPath + '/';
}

module.exports = {
  mode: 'development',
  entry: prod ? './src/index.prod.ts' : './src/index.dev.ts',
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(html)?$/,
        exclude: [
          path.resolve(PATH.SRC, './index.dev.html'),
          path.resolve(PATH.SRC, './index.prod.html'),
        ],
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: prod,
            }
          }
        ]
      },
      {
        test: /\.(scss)?$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    port: 9010,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.dev.html',
    }),
  ],
  output: {
    library: 'MarkdownEditor',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist'),
    filename: 'markdown-editor.min.js'
  },
  devtool: 'eval-cheap-source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};