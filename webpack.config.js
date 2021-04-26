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
          path.resolve(PATH.SRC, './index.dev.html')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/templates',
              outputPath: 'templates',
              name: '[path][name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.(scss)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/templates',
              outputPath: 'templates',
              name: '[path][name].[ext]',
            },
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
    port: 9009,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './styles/[name].css',
      chunkFilename: '[id].css',
    }),
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
  target: ['web', 'es5'],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};