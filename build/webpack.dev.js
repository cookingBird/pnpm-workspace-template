const { merge } = require('webpack-merge');
const common = require('./webpack.common');

/**@type { import("webpack").Configuration } */
const config = {
  mode: 'development',
  devtool: false,
};

module.exports = merge(common, config);
