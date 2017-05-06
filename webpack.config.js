const path = require('path');
const webpack = require('webpack');
const fabricatorConfig = require('./fabricator/fabricator.angular.config');

module.exports = [
    {
        context: path.resolve(__dirname, './src'),
        entry: {
            toolkit: './toolkit.ts'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, './dist')
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
        scripts: ['toolkit.bundle.js']
    })
];
