const path = require("path");

const themeEntries = require('./MapStore2/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/buildConfig')(
    {
        'MapStore2-C098': path.join(__dirname, "js", "app"),
        'MapStore2-C098-embedded': path.join(__dirname, "MapStore2", "web", "client", "product", "embedded"),
        'MapStore2-C098-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api")
    },
    themeEntries,
    paths,
    extractThemesPlugin,
    true,
    "/MapStore2-C098/dist/",
    '.MapStore2-C098',
    [
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'indexTemplate.html'),
            chunks: ['MapStore2-C098'],
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'embeddedTemplate.html'),
            chunks: ['MapStore2-C098-embedded'],
            inject: true,
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'apiTemplate.html'),
            chunks: ['MapStore2-C098-api'],
            inject: 'head',
            hash: true,
            filename: 'api.html'
        })
    ]
);
