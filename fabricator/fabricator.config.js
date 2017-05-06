const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const defaultJsDomView = require('jsdom').jsdom().defaultView;
const webpack = require('webpack');

module.exports = function (settings) {
    return {
        target: 'node',
        context: path.resolve(__dirname),
        entry: settings.entry || './fabricator.js',
        resolve: {
            alias: {
                project: path.resolve(settings.projectPath, './'),
                toolkit: path.resolve(settings.projectPath, './src')
            }
        },
        output: {
            filename: 'fabricator.bundle.js',
            path: path.resolve(settings.projectPath, './dist'),
            libraryTarget: 'umd'
        },
        module: {
            rules: [{
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                TOOLKIT_PATH: JSON.stringify(path.resolve(settings.projectPath, './src'))
            }),
            new StaticSiteGeneratorPlugin({
                crawl: true,
                paths: ['/'],
                globals: defaultJsDomView,
                locals: {
                    scripts: settings.scripts || []
                }
            })
        ]
    };
};
