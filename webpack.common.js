/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require('webpack');

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

const client = {
    devtool: "inline-source-map",
    entry: path.join(SRC_ROOT, "client/index.jsx"),
    mode: "development",
    module: {
        rules: [
        {
            resourceQuery: (value) => {
            const query = new URLSearchParams(value);
            return query.has("raw");
            },
            type: "asset/source",
        },
        {
            exclude: /[\\/]esm[\\/]/,
            test: /\.jsx?$/,
            use: {
            loader: "babel-loader",
            options: {
                presets: [
                [
                    "@babel/preset-env",
                    {
                    modules: "cjs",
                    spec: true,
                    },
                ],
                "@babel/preset-react",
                ],
            },
            },
        },
        ],
    },
    name: "client",
    output: {
        path: DIST_PUBLIC,
    },
    plugins: [
        new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
        }),
        new webpack.NormalModuleReplacementPlugin(
        /moment-timezone\/data\/packed\/latest\.json/,
        require.resolve('./misc/timezone-definitions'),
        ),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    target: "web",
};

const server = {
    devtool: "inline-source-map",
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|mjs|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "cjs",
                    spec: true,
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "server",
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
};

/** @type {Array<import('webpack').Configuration>} */
module.exports = [client, server];