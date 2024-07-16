const { merge } = require('webpack-merge');
const common = require('./webpack.common');

/**@type { import("webpack").Configuration } */
const config = {
  mode: 'development',
};

module.exports = merge(common, config);
