const webpack = require('webpack');
const VERSION = require('./package.json').version;

const srcDirs = ['./src'];

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: './build/bundles/',
        filename: `[name]-${VERSION}.js`
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};
