/* webpack.prod.js */
const { merge: Merge } = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = Merge(CommonConfig, {
  output: {
    filename: '[name]-[contenthash].bundle.js',
    path: path.resolve('assets/bundles'),   // aislamos artefactos
    publicPath: '/assets/bundles/',         // ruta pública de los bundles
    hashFunction: 'xxhash64',               // 👈 evita ERR_OSSL_EVP_UNSUPPORTED en Node 18
    clean: false
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ terserOptions: { keep_fnames: true } })]
  },
  plugins: [
    new CleanWebpackPlugin({
      // limpia SOLO dentro de assets/bundles
      cleanOnceBeforeBuildPatterns: ['**/*'],
      verbose: true
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
  ],
});
