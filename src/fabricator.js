const project = require('../package.json');
const layout = require('./layout.hbs');

module.exports = function render(locals) {
    return layout({
        project: project,
        body: require('./index.hbs')()
    });
};
