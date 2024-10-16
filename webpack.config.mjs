import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: path.resolve(__dirname, 'src/main.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.glsl$/i,
        use: 'webpack-glsl-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: { extract: true },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new SpriteLoaderPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}