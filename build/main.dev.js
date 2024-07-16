const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require('./webpack.dev');
const path = require('path');
const { readFile } = require('./tools/rewrite.cjs');

const inputs = process.argv.slice(3);
const pkgFile = readFile(
  path.resolve(__dirname, '../packages', inputs[0], 'package.json'),
);
if (!pkgFile.build) {
  throw Error(' build params is not nullable');
}
/**@type { import("webpack").Configuration } */
const _config = {
  entry: {
    name: {
      import: path.resolve(__dirname, '../packages', inputs[0], pkgFile.build.entry),
      library: {
        name: pkgFile.build.name,
        type: pkgFile.build.type || 'umd',
        auxiliaryComment: {
          root: 'Root Module',
          commonjs: 'CommonJS Module',
          commonjs2: 'CommonJS2 Module',
          amd: 'AMD Module',
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist', inputs[0]),
  },
};

webpack(merge(config, _config), (err, stats) => {
  if (err || stats?.hasErrors()) {
    // ...
  }
  // 处理完成
});
