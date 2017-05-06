const fs = require('fs');
const path = require('path');

module.exports = function createRenderer(collectMaterial) {

    const MATERIALS_DIR = 'materials';
    const TEMPLATES_DIR = 'templates';

    const PROJECT = require('project/package.json');

    const MATERIALS = collectMaterials(collectMaterial);

    const PAGE_TYPE = {
        INDEX: 'INDEX',
        MATERIALS: 'MATERIALS',
        TEMPLATE: 'TEMPLATE',
        for: path => ({
            [MATERIALS_DIR]: PAGE_TYPE.MATERIALS,
            [TEMPLATES_DIR]: PAGE_TYPE.TEMPLATE
        }[path.split('/')[1]] || PAGE_TYPE.INDEX)
    };

    const LAYOUTS = {
        [PAGE_TYPE.INDEX]: require('./layouts/fabricator.hbs'),
        [PAGE_TYPE.MATERIALS]: require('./layouts/fabricator.hbs'),
        [PAGE_TYPE.TEMPLATE]: require('./layouts/template.hbs'),
        for: path => LAYOUTS[PAGE_TYPE.for(path)]
    };

    const VIEWS = {
        [PAGE_TYPE.INDEX]: require('./views/index.hbs'),
        [PAGE_TYPE.MATERIALS]: require('./views/materials.hbs'),
        [PAGE_TYPE.TEMPLATE]: require('./views/template.hbs'),
        for: path => VIEWS[PAGE_TYPE.for(path)]
    };

    return function render(locals) {
        const materialGroup = getMaterialGroup(locals.path);
        return LAYOUTS.for(locals.path)({
            MATERIALS_DIR: MATERIALS_DIR,
            TEMPLATES_DIR: TEMPLATES_DIR,
            materialGroups: MATERIALS,
            project: PROJECT,
            scripts: locals.scripts,
            view: VIEWS.for(locals.path)({
                materialGroupName: materialGroup,
                materialGroup: MATERIALS[materialGroup]
            })
        });
    };

    function getMaterialGroup(path) {
        return (new RegExp(`${MATERIALS_DIR}\/(.+?)\/`, 'g').exec(path + '/') || []).pop();
    }

    function collectMaterials(collectMaterial) {
        return mapDirs(
            path.join(TOOLKIT_PATH, MATERIALS_DIR),
            groupDir => mapDirs(
                path.join(TOOLKIT_PATH, MATERIALS_DIR, groupDir),
                itemDir => collectMaterial(`${MATERIALS_DIR}/${groupDir}/${itemDir}`, itemDir)));
    }
};

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
