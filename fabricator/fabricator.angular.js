module.exports = require('./fabricator.core')(collectMaterial);

function collectMaterial(itemPath, itemDir) {
    return {
        preview: `<tk-${itemDir}-preview>Loading...</tk-${itemDir}-preview>`,
    };
}


// function collectMaterial(itemPath, itemDir) {
//     return {
//         preview: `<tk-${itemDir}-preview>Loading...</tk-${itemDir}-preview>`,
//         // script: require(`toolkit/${itemPath}/${itemDir}.preview.ts`)
//     };
// }
//
// module.exports = require('./fabricator')(collectMaterial);
//
// // <script>(function () {${require(`toolkit/${itemPath}/${itemDir}.preview.ts`)}})()</script>
