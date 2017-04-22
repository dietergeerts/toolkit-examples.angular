const fs = require('fs');
const path = require('path');
const layout = require('./layout.hbs');
const project = require('../../package.json');
const indexView = require('./views/index.hbs');
const materialsView = require('./views/materials.hbs');

const materials = collectMaterials();
const viewsByPath = {'': indexView, 'materials': materialsView};

module.exports = function render(locals) {
    const bodyView = viewsByPath[locals.path.split('/')[1]];
    const body = bodyView({materials});
    return layout({project, materials, body});
};

function collectMaterials() {
    return getSubDirs('./src/toolkit/materials')
        .reduce((result, value) => {
            result[value] = {};
            return result;
        }, {});
}

function getSubDirs(dir) {
    return fs
        .readdirSync(dir)
        .filter(file => fs
            .statSync(path.join(dir, file))
            .isDirectory());
}
