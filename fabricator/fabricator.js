module.exports = require('./fabricator.core')(collectMaterial);

function collectMaterial(itemPath, itemDir) {
    return {
        preview:  `<h4>TODO: Preview of ${itemDir} in ${itemPath}</h4>`
    };
}
