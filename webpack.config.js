const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const defaultJsDomView = require('jsdom').jsdom().defaultView;

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        fabricator: './fabricator.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            //     {
            //     test: /\.html$/,
            //     loader: 'raw-loader'
            // }
        ]
    },
    plugins: [
        new StaticSiteGeneratorPlugin({
            entry: 'fabricator',
            crawl: true,
            globals: defaultJsDomView
        })
    ]
};
