const fabricator = require('../fabricator/fabricator');

module.exports = fabricator.createRenderer({
    scripts: ['toolkit.bundle.js'],
    materials: fabricator.collectMaterialGroups([
        ['forms', [
            'form-submission'
        ]]
    ])
});
