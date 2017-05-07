const path = require('path');
const webpack = require('webpack');
const AssetsManifest = require('webpack-assets-manifest');
const fabricatorConfig = require('./fabricator/fabricator.angular.config');

const assetsManifest = new AssetsManifest({publicPath: 'assets/'});

module.exports = [
    {
        context: path.resolve(__dirname, './src'),
        entry: {
            toolkit: './toolkit.ts'
        },
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, './dist/assets')
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        module: {
            rules: [{
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }]
        },
        plugins: [
            assetsManifest,
            new webpack.DefinePlugin({
                '__PROCESS__': {
                    'ENV': JSON.stringify(process.env.NODE_ENV)
                }
            }),
            // Fix for https://github.com/angular/angular/issues/11580, in production!
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                __dirname
            )
        ]
    },
    fabricatorConfig({
        projectPath: path.resolve(__dirname),
        assetsManifest: assetsManifest
    })
];
