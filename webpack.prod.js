const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// merge対象の取得
const client = common.findIndex(config => config.target === "web");
const server = common.findIndex(config => config.target === "node");

// mergeして設定
const mergeClient = merge(common[client], {
    mode: 'production',
    devtool: 'source-map',
});
const mergeServer = merge(common[server], {
    devtool: 'source-map',
});

/** @type {Array<import('webpack').Configuration>} */
module.exports = [mergeClient, mergeServer];