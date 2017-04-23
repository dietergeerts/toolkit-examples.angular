const fs = require('fs');
const path = require('path');

const PROJECT = require('project/package.json');
// TODO: Get the alias for toolkit out of webpack.config.js!
// const TOOLKIT_PATH = WEBPACK_CONFIG.resolve.alias.toolkit;
const TOOLKIT_PATH = './src/toolkit';

const MATERIALS_DIR = 'materials';
const TEMPLATES_DIR = 'templates';

const PAGE_TYPE = {
    DEFAULT: 'DEFAULT',
    MATERIAL: 'MATERIAL',
    TEMPLATE: 'TEMPLATE',
    for: path => ({
        [MATERIALS_DIR]: PAGE_TYPE.MATERIAL,
        [TEMPLATES_DIR]: PAGE_TYPE.TEMPLATE
    }[path.split('/')[1]] || PAGE_TYPE.DEFAULT)
};

const VIEWS = {
    [PAGE_TYPE.DEFAULT]: require('views/index.hbs'),
    [PAGE_TYPE.MATERIAL]: require('views/materials.hbs'),
    [PAGE_TYPE.TEMPLATE]: require('views/template.hbs'),
    get: path => VIEWS[PAGE_TYPE.for(path)]
};

const LAYOUTS = {
    [PAGE_TYPE.DEFAULT]: require('layouts/default.hbs'),
    [PAGE_TYPE.MATERIAL]: require('layouts/materials.hbs'),
    [PAGE_TYPE.TEMPLATE]: require('layouts/template.hbs'),
    get: path => LAYOUTS[PAGE_TYPE.for(path)]
};

const MATERIALS = mapDirs(
    path.join(TOOLKIT_PATH, MATERIALS_DIR),
    groupDir => mapDirs(
        path.join(TOOLKIT_PATH, MATERIALS_DIR, groupDir),
        itemDir => ({
            preview: require(`toolkit/${MATERIALS_DIR}/${groupDir}/${itemDir}/${itemDir}.hbs`)()
        })));

function getMaterialGroup(path) {
    return (new RegExp(`${MATERIALS_DIR}\/(.+?)\/`, 'g').exec(path + '/') || []).pop();
}

function mapDirs(path, map) {
    return getDirs(path)
        .reduce((result, dir) => {
            result[dir] = map(dir);
            return result;
        }, {});
}

function getDirs(dir) {
    return fs.readdirSync(dir)
        .filter(file => fs
            .statSync(path.join(dir, file))
            .isDirectory());
}

module.exports = function render(locals) {
    const materialGroup = getMaterialGroup(locals.path);
    return LAYOUTS.get(locals.path)({
        project: PROJECT,
        materials: MATERIALS,
        view: VIEWS.get(locals.path)({
            materialGroup: materialGroup,
            materials: MATERIALS[materialGroup]
        })
    });
};
