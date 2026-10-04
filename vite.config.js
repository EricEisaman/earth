"use strict";

var fs = require("node:fs");
var path = require("node:path");

function copyStaticFiles() {
    return {
        name: "copy-static-files",
        closeBundle: function() {
            fs.cpSync(path.resolve(__dirname, "public"), path.resolve(__dirname, "dist"), {
                recursive: true,
                filter: function(source) {
                    return !source.endsWith(".html");
                }
            });
        }
    };
}

module.exports = {
    root: path.resolve(__dirname, "public"),
    base: process.env.VITE_BASE_PATH || "/",
    publicDir: false,
    plugins: [copyStaticFiles()],
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "public/index.html"),
                about: path.resolve(__dirname, "public/about.html"),
                jp: path.resolve(__dirname, "public/jp/index.html"),
                "jp/about": path.resolve(__dirname, "public/jp/about.html")
            }
        }
    }
};