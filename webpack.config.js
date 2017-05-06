const path = require('path');
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
                loader: 'awesome-typescript-loader'
            }]
        }
    },
    fabricatorConfig({
        projectPath: path.resolve(__dirname),
        scripts: ['toolkit.bundle.js']
    })
];
