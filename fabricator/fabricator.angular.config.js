const fabricatorConfig = require('./fabricator.config');

module.exports = function (settings) {
    settings.entry = './fabricator.angular.js';
    settings.moduleRules = [{
        test: /\.html$/,
        loader: 'raw-loader'
    }];
    return fabricatorConfig(settings);
};