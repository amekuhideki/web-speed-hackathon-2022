const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// merge対象の取得
const client = common.findIndex(config => config.target === "web");
const server = common.findIndex(config => config.target === "node");

// mergeする情報
const mergeClientConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
}
const mergeServerConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
}

// mergeして設定
const mergeClient = merge(common[client], mergeClientConfig);
const mergeServer = merge(common[server], mergeServerConfig);

/** @type {Array<import('webpack').Configuration>} */
module.exports = [mergeClient, mergeServer];