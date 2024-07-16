const { merge } = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.prod');
const path = require('path');
const { readFile } = require('./tools/rewrite.cjs');

const inputs = process.argv.slice(2);
console.log('input', inputs);
const pkgFile = readFile(
  path.resolve(__dirname, '../packages', inputs[0], 'package.json'),
);
if (!pkgFile.build || !pkgFile.build.name) {
  throw Error(' build params is not nullable');
}
/**@type { import("webpack").Configuration } */
const _config = {
  entry: {
    [pkgFile.build.name]: {
      import: path.resolve(__dirname, '../packages', inputs[0], pkgFile.build.entry),
      library: {
        name: pkgFile.build.name,
        type: pkgFile.build.type || 'umd',
      },
    },
  },
  output: {
    path: path.resolve(__dirname, '../packages', inputs[0], 'dist'),
  },
};

webpack(merge(config, _config), (err, stats) => {
  if (err || stats?.hasErrors()) {
    console.log('error', err);
  }
  // 处理完成
});
