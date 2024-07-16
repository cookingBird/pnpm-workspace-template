const webpack = require('webpack');
const config = require('./webpack.prod');
webpack(config, (err, stats) => {
  if (err || stats?.hasErrors()) {
    // ...
  }
  // 处理完成
});
