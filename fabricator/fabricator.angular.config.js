const fabricatorConfig = require('./fabricator.config');

module.exports = function (settings) {
    settings.entry = './fabricator.angular.js';
    return fabricatorConfig(settings);
};