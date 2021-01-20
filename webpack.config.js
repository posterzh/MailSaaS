const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    site: './assets/site.js',  // required for bulma sass/css styles
    app: './assets/javascript/app.js',
    teams: './assets/javascript/teams.js',
    pegasus: './assets/javascript/pegasus/pegasus.js',
    'react-object-lifecycle': './assets/javascript/pegasus/react/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './static'),
    filename: 'js/[name]-bundle.js',
    library: ["SiteJS", "[name]"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      'filename': 'css/[name].css',
    }),
  ]
};
