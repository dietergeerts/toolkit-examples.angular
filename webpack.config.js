const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const defaultJsDomView = require('jsdom').jsdom().defaultView;

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
        module: {
            rules: [{
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }]
        }
    },
    {
        target: 'node',
        context: path.resolve(__dirname, './src'),
        entry: {
            fabricator: './fabricator.js'
        },
        resolve: {
            alias: {
                project: path.resolve(__dirname, './'),
                toolkit: path.resolve(__dirname, './src')
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
    }
];
