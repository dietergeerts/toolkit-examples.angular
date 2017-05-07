const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const defaultJsDomView = require('jsdom').jsdom().defaultView;
const webpack = require('webpack');
const Rx = require('rxjs/Rx');

module.exports = function (settings) {

    // TODO: Find a way to just require the optional file, so we are being updated automatically,
    // though it seems that after the file is regenerated, the toolkit is also rebuild, don't know why...
    const assetsDone = new Rx.ReplaySubject(1);
    settings.assetsManifest
        ? settings.assetsManifest.on('done', (manifest) => assetsDone.next(manifest))
        : assetsDone.next();

    return {
        target: 'node',
        context: path.resolve(__dirname),
        entry: {
            fabricator: settings.entry || './fabricator.js'
        },
        resolve: {
            alias: {
                project: path.resolve(settings.projectPath, './'),
                toolkit: path.resolve(settings.projectPath, './src')
            }
        },
        output: {
            filename: '[name].js',
            path: path.resolve(settings.projectPath, './dist'),
            libraryTarget: 'umd'
        },
        module: {
            rules: [{
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }].concat(settings.moduleRules || [])
        },
        plugins: [
            new webpack.DefinePlugin({
                __TOOLKIT_PATH__: JSON.stringify(path.resolve(settings.projectPath, './src'))
            }),
            new StaticSiteGeneratorPlugin({
                crawl: true,
                paths: [''],
                globals: defaultJsDomView,
                locals: {
                    assetsDone: assetsDone
                }
            })
        ]
    };
};
