/* eslint-env node */
/* eslint-disable no-process-env */

import webpack from 'webpack';
import path from 'path';
import {version as VERSION} from '../package.json';

const rootDir = path.resolve(__dirname, '..');
const srcDirs = [
    path.resolve(rootDir, 'src'),
];

export const config = {
    entry: {
        hello: './src/app/pages/hello/hello-client-entry.js'
    },
    output: {
        path: './dist/bundles/pages/',
        filename: `[name]-${majoraVersion}.js`
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                include: srcDirs,
                loader: 'eslint'
            }
        ],
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader'},
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: srcDirs,
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ],
                    'plugins': [
                        'transform-object-assign'
                    ]
                }
            },
            {test: /\.html$/, loader: 'html'},
            {test: /\.css$/, loader: 'css'},
            {test: /\.less$/, loader: 'css!less'},
            {test: /\.(gif|png|jpg|jpeg)$/, loader: 'url-loader'},
            {test: /\.(eot|svg|woff|ttf|svg)$/, loader: 'url-loader'}
        ]
    },
    node: {
        fs: 'empty' // avoids error messages for handlebars
    },
    plugins: [
        new webpack.DefinePlugin({
            global: 'window',
            PAIRASLAX_VERSION: VERSION
        }),
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            append: `\n//# sourceMappingURL=[url]`,
            moduleFilenameTemplate: '[name]:///[resource-path]'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin()
    ]
};
