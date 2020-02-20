const path = require('path');

module.exports = {
  entry: './src/DatePickerITF/DatePicker.tsx',
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
    "react-dom": "react-dom"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};