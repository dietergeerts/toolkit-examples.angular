const fs = require('fs');
const path = require('path');
const layout = require('./layout.hbs');
const project = require('../../package.json');

const materials = collectMaterials();

module.exports = function render(locals) {
    return layout({
        project,
        materials,
        body: require('../toolkit/index.hbs')()
    });
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
