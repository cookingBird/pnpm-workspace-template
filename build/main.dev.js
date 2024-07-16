const webpack = require('webpack');
const config = require('./webpack.dev');

webpack(config, (err, stats) => {
  if (err || stats?.hasErrors()) {
    // ...
  }
  // 处理完成
});
