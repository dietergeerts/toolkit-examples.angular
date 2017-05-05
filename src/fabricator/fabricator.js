const fs = require('fs');
const path = require('path');

const PROJECT = require('project/package.json');
const TOOLKIT_PATH = PROJECT['directories']['lib'];

const MATERIALS_DIR = 'materials';
const TEMPLATES_DIR = 'templates';

const PAGE_TYPE = {
    INDEX: 'INDEX',
    MATERIALS: 'MATERIALS',
    TEMPLATE: 'TEMPLATE',
    for: path => ({
        [MATERIALS_DIR]: PAGE_TYPE.MATERIALS,
        [TEMPLATES_DIR]: PAGE_TYPE.TEMPLATE
    }[path.split('/')[1]] || PAGE_TYPE.INDEX)
};

const VIEWS = {
    [PAGE_TYPE.INDEX]: require('fabricator/views/index.hbs'),
    [PAGE_TYPE.MATERIALS]: require('fabricator/views/materials.hbs'),
    [PAGE_TYPE.TEMPLATE]: require('fabricator/views/template.hbs'),
    for: path => VIEWS[PAGE_TYPE.for(path)]
};

const LAYOUTS = {
    [PAGE_TYPE.INDEX]: require('fabricator/layouts/fabricator.hbs'),
    [PAGE_TYPE.MATERIALS]: require('fabricator/layouts/fabricator.hbs'),
    [PAGE_TYPE.TEMPLATE]: require('fabricator/layouts/template.hbs'),
    for: path => LAYOUTS[PAGE_TYPE.for(path)]
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
    return LAYOUTS.for(locals.path)({
        project: PROJECT,
        materials: MATERIALS,
        view: VIEWS.for(locals.path)({
            materialGroup: materialGroup,
            materials: MATERIALS[materialGroup]
        })
    });
};
