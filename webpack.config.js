const webpack = require('webpack');
const process = require('process');
const VERSION = require('./package.json').version;

const srcDirs = ['./src'];

const isProd = process.env['NODE_ENV'] === 'production';

const webpackConfig = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: './build/bundles/',
        filename: `[name]-${VERSION}.js`
    },
    module: {
        loaders: [
            // Transpile JSX files
            {
                test: /\.jsx$/,
                loader: 'jsx-loader'
            },

            // Transpile all JS files with babel
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // Use Bluebird as Promise
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        }),

        // Define some "global" constants that will be inlined at compile time.
        new webpack.DefinePlugin({
            'global': 'window',     // when we reference "global" in code, it will be replaced with "window".
            'PAIRASLAX_VERSION': VERSION
        })
    ]
};

if (isProd) {
    webpackConfig.plugins = webpackConfig.plugins.concat([
        // Minify output
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),

        // Create source map
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            append: '\n//# sourceMappingURL=[url]',
            moduleFilenameTemplate: '[name]:///[resource-path]'
        }),

        // Remove duplicate files from bundles
        new webpack.optimize.DedupePlugin()
    ]);
}

module.exports = webpackConfig;
