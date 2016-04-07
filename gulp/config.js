var path = require('path');

var dist = './dist'; // 出力先ディレクトリ
var src = './src';  // ソースディレクトリ
var relativeSrcPath = path.relative('.',  src);

module.exports = {
  src: src,
  dist: dist,

  jade: {
    src: [
      src + '/!(_)*.jade'
    ],
    dest: dist,
    options: {pretty: true}
  },
  webpack: {
    entry: src + '/scripts/index.tsx',
    dest: dist,
    config: './webpack.config.js'
  },
  watch: {
    jade: relativeSrcPath + '/**'
                               }
                               }
