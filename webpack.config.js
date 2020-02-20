const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/DatePickerITF/DatePicker.tsx',
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:sc|sa|c)ss$/,
        use: [        
          MiniCssExtractPlugin.loader,  
          {
            loader: "css-loader",
            options: { sourceMap: false }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: false }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        loader: "file-loader",
        options: {
          context: "./src",
          publicPath: "/",
          name: "media/assets/images/[name].[ext]",
          outputPath: url => url
        }
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  externals: {
    "react": "react",
  },
  output: {
    filename: 'bundle.js',
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production'
};