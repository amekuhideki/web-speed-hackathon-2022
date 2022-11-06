const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// merge対象の取得
const client = common.findIndex(config => config.target === "web");
const server = common.findIndex(config => config.target === "node");

// mergeする情報
const mergeConfig = {
    mode: 'development',
    devtool: 'source-map',
}

// mergeして設定
const mergeClient = merge(common[client], mergeConfig);
const mergeServer = merge(common[server], mergeConfig);

/** @type {Array<import('webpack').Configuration>} */
module.exports = [mergeClient, mergeServer];