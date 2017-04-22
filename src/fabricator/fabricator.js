const fs = require('fs');
const path = require('path');
const layout = require('./layout.hbs');
const project = require('../../package.json');
const indexView = require('./views/index.hbs');
const materialsView = require('./views/materials.hbs');

const materials = collectMaterials();
const viewsByPath = {'': indexView, 'materials': materialsView};

module.exports = function render(locals) {
    const pathArray = locals.path.split('/');
    const bodyView = viewsByPath[pathArray[1]];
    const materialGroup = bodyView === materialsView ? pathArray[2] : null;
    return layout({
        project: project,
        materials: materials,
        body: bodyView({
            materials: materialGroup && materials[materialGroup] || materials
        })
    });
};

function collectMaterials() {
    const materialsDir = './src/toolkit/materials';
    return mapSubDirs(materialsDir,
        groupDir => mapSubDirs(path.join(materialsDir, groupDir),
            itemDir => ({})));
}

function mapSubDirs(dir, value) {
    return getSubDirs(dir)
        .reduce((result, subDir) => {
            result[subDir] = value(subDir);
            return result;
        }, {});
}

function getSubDirs(dir) {
    return fs.readdirSync(dir)
        .filter(file => fs
            .statSync(path.join(dir, file))
            .isDirectory());
}
