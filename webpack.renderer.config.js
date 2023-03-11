const rules = require('./webpack.rules');
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.html$/,
  use: [{ loader: 'html-loader'}],
});


module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chemistry Lab',
      template: path.join(__dirname, '/src/templates/index.ejs'),
      filename: "index.html",
      inject: true
    })
  ],
};
