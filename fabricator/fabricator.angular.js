module.exports = require('./fabricator.core')(collectMaterial);

function collectMaterial(itemPath, itemDir) {
    return {
        preview: `<tk-${itemDir}-preview>Loading...</tk-${itemDir}-preview>`,
        code: require(`toolkit/${itemPath}/${itemDir}.preview.html`)
    };
}
