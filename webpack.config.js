const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const defaultJsDomView = require('jsdom').jsdom().defaultView;

module.exports = {
    target: 'node',
    context: path.resolve(__dirname, './src'),
    entry: {
        fabricator: './fabricator/fabricator.js'
    },
    resolve: {
        alias: {
            project: path.resolve(__dirname, './'),
            toolkit: path.resolve(__dirname, './src/toolkit'),
            fabricator: path.resolve(__dirname, './src/fabricator'),
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }]
    },
    plugins: [
        new StaticSiteGeneratorPlugin({
            crawl: true,
            entry: 'fabricator',
            paths: ['/'],
            globals: defaultJsDomView,
            locals: {}
        })
    ]
};
