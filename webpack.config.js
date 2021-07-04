const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function useUsersFile(file) {
  return path.resolve(process.cwd(), file);
}

const usersBabel = useUsersFile('.babelrc.js');
// eslint-disable-next-line import/no-dynamic-require
const babelrc = require(usersBabel);

const config = {
  entry: {
    app: path.resolve(process.cwd(), 'public/index.tsx')
  },
  output: {
    path: path.resolve(process.cwd(), 'dist')
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json']
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public/index.html'),
      filename: './index.html',
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true
      }
    }),
  ],
  module: {
    rules: [
      // transpile js and jsx to es5
      {
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            ...babelrc
          }
        }
      },
      // handle images
      {
        test: /\.(png|svg|jpg|gif)$/,
        // exclude: /(?!node_modules\/@ayx)(node_modules)/,
        use: ['file-loader']
      },
      // transpile ts and tsx to esnext then to es5 with babel
      {
        test: [/\.tsx?$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              ...babelrc
            }
          },
          {
            loader: 'ts-loader',
            options: {
              context: process.cwd(),
              configFile: useUsersFile('tsconfig.json'),
              transpileOnly: true
            }
          }
        ]
      },
    ],
  },
};

module.exports = config;
