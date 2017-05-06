module.exports = {
    createRenderer: createRenderer,
    collectMaterial: collectMaterial,
    collectMaterials: collectMaterials,
    collectMaterialGroup: collectMaterialGroup,
    collectMaterialGroups: collectMaterialGroups,
};

function createRenderer(options) {

    const MATERIALS_DIR = options['materialsDir'] || 'materials';
    const TEMPLATES_DIR = options['templatesDir'] || 'templates';

    const MATERIALS = options['materials'] || [];
    const SCRIPTS = options['scripts'] || [];

    const PROJECT = require('project/package.json');

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
            scripts: SCRIPTS,
            view: VIEWS.for(locals.path)({
                materialGroup: MATERIALS.find((g) => g.name === materialGroup)
            })
        });
    };

    function getMaterialGroup(path) {
        return (new RegExp(`${MATERIALS_DIR}\/(.+?)\/`, 'g').exec(path + '/') || []).pop();
    }
}

function collectMaterialGroups(groups) {
    return groups.map((group) => collectMaterialGroup(group));
}

function collectMaterialGroup(group) {
    return {
        name: group[0],
        materials: collectMaterials(group[1])
    };
}

function collectMaterials(materials) {
    return materials.map((material) => collectMaterial(material));
}

function collectMaterial(material) {
    return {
        name: material
    };
}
