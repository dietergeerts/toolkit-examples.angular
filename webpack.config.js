const path = require('path');
const fabricatorConfig = require('./fabricator/fabricator.config');

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
    fabricatorConfig({
        projectPath: path.resolve(__dirname),
        scripts: ['toolkit.bundle.js']
    })
];
