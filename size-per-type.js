#! /usr/bin/env node

/*
 * The script recursively processes files and directories under a root directory specified
 * by the user. The script produces total size and count of each file type present under the root.
 * It also optionally displays a file tree. Both hidden and non-hidden directories are
 * processed. Only non-hidden files are used for the size-per-filetype calculation.
 *
 * Copyright 2018 Bo Ericsson, bo@boe.net
 * License: MIT
 *
 * Version: 1.0.0
 */

'use strict';

/* eslint-env node */
/* eslint-disable no-console */

// Dependencies
const fs = require('fs');
const path = require('path');
const d3 = require('d3');

// Formatter for file size info
const fmtK = d3.format(".2s");

/**
 * Displays help text
 */
function displayHelp() {
    const helpText = [
        `Usage: ./size-per-type options target`,
        `Where target is the target root directory (default is the current directory)`,
        `Available options:`,
        ` --help   Help (this text)`,
        ` --tree   Display the file/directory tree`,
        ` --list   List all file paths`,
        ` --json   Output JSON of the file/directory tree`,
        `Example: './size-per-type.js --tree .'`
    ];

    // Display the help text
    console.log(helpText.join('\n'));
    console.log();

    // Exit
    process.exit(0);
}

// Options
let displayTree = false;
let displayList = false;
let displayJson = false;

// Process command line params
const options = {
    ['--help']: displayHelp,
    ['--tree']: () => { displayTree = true; },
    ['--list']: () => { displayList = true; },
    ['--json']: () => { displayJson = true; }
};
const noop = () => {};

// Get params (skip first two arguments)
const argv = process.argv.slice(2);

// Handle valid options
for (let arg of argv) {
    (options[arg] || noop)();
}

// Set target directory (last command line argument)
const root = argv[argv.length - 1] || '.';

// Resolve the specified path
const resolvedPath = path.resolve(root);
log(resolvedPath);

// Array to hold the paths of all files and directories under the specified root
const filePaths = [];

// Object to hold the directory tree
const tree = {
    node: root,
    type: 'dir',
    size: 0,
    children: []
};

/**
 * Recursive function to process a directory
 *
 * @param {object} dir - JS object containing the directory tree or sub-tree
 * @param {number} indent - Current indentation level (for the tree listing)
 */
async function listDirectory(dir, indent) {
    return new Promise((resolve, reject) => {
        const foundFiles = [];
        const foundDirs = [];

        getDirectoryEntries(dir.node)
            .then(async (entries) => {

                // Process the directory entries
                for (let entry of entries) {
                    const path = `${ dir.node }/${ entry }`;
                    const stats = await getStats(path);
                    const target = stats.isFile() ? foundFiles : foundDirs;

                    target.push({
                        name: entry,
                        size: stats.size || 0
                    });
                }
            })
            .then(async () => {
                const pad = getPadding(indent, ' ');

                // Process the files
                foundFiles.forEach(file => {
                    // Output the file
                    log(`${ pad } ${ file.name }`);

                    // Save the file (for optional file path listing)
                    filePaths.push(`${ dir.node }/${ file.name } (file)`);

                    // Add file to tree
                    const path = `${ dir.node }/${ file.name }`;
                    dir.children.push({
                        node: path,
                        type: 'file',
                        size: file.size
                    });
                });

                if (foundDirs.length > 0) {
                    const newIndent = indent += 4;

                    // Process each sub-directory in the directory
                    for (var newDir of foundDirs) {
                        // Output the directory
                        log(`${ pad } ${ newDir.name }`);

                        // Save the directory (for optional file path listing)
                        filePaths.push(`${ dir.node }/${ newDir.name } (dir)`);

                        // Add directory to tree
                        const dirPath = `${ dir.node }/${ newDir.name }`;
                        const root = {
                            node: dirPath,
                            type: 'dir',
                            size: 0,
                            children: []
                        };
                        dir.children.push(root);

                        // Recurse
                        await listDirectory(root, newIndent);
                    }
                }
                resolve();
            })
            .catch(e => {
                console.error(`Error:' ${ e }`);
            });
    });
}

/**
 * Returns a promise which will provide all entries (files and sub-directories)
 * in the specified directory
 *
 * @param {string} dir - String specififying a directory path
 */
function getDirectoryEntries(dir) {
    return new Promise((resolve, reject) => {
        try {
            fs.readdir(dir, (error, entries) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(entries);
                }
            });
        } catch(error) {
            console.error(`Error:' ${ error }`);
            reject(error);
        }
    });
}

/**
 * Returns a promise which will provide file stats for the specified file path
 *
 * @param {string} path - String specififying a file or directory path
 */
function getStats(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.stat(path, (error, stats) => {
                resolve(stats);
                if (error) {
                    reject(error);
                }
            });
        } catch(error) {
            console.error(`Error:' ${ error }`);
            reject(error);
        }
    });
}

/**
 * Provides padding for the file tree
 *
 * @param {number} indent - Specifies the indentation level
 * @param {string} char - Specifies the character to be used when padding the ling
 */
function getPadding(indent, char) {
    const pad = new Array(indent + 1).join(char);
    // http://xahlee.info/comp/unicode_drawing_shapes.html
    return `${ pad }┗━━`;
}

/**
 * Processes the directory tree to obtain file size to obtain file size information
 *
 * @param {object} tree - JS object containing the directory tree
 */
function processTree(tree) {

    // Recursive function to process the tree
    function getSize(tree) {
        if (tree.type === 'dir') {
            let size = 0;
            // Directory node
            if (tree.children.length > 0) {
                for (let child of tree.children) {
                    size += getSize(child);
                }
            }
            tree.size = size;
            return size;
        } else {
            // File node
            return tree.size;
        }
    }

    // Start the recursive process
    const totalSize = getSize(tree);
    console.log(`\nTotal directory size: ${ fmtK(totalSize) }`);
}

/**
 * Processes the directory tree to aggregate byte count per file type
 *
 * @param {object} tree - JS object containing the directory tree
 */
function getFileTypes(tree) {
    const files = [];
    const extensionMap = new Map();

    // Recursive function to process each tree node (file or directory)
    // The extensionMap (holding each unique file type) is updated during the recursion
    function visit(tree) {
        if (tree.type === 'dir') {
            // Directory node
            for (let child of tree.children) {
                visit(child);
            }
        } else {
            // File node
            const fullName = tree.node.slice(2);
            let extension = '';

            const pathParts = fullName.split('/');

            // Get file
            const fileName = pathParts[pathParts.length - 1];

            // Hidden file?
            const hiddenTestRe = /^\./;
            const hidden = hiddenTestRe.test(fileName);

            // Only process non-hidden files
            if (!hidden) {
                const fileParts = fileName.split('.');
                if (fileParts.length > 1) {
                    extension = fileParts[fileParts.length -1];
                }
            }

            // Save the file info for further processing by 'aggregate' function below
            files.push({
                filePath: tree.node,
                fileName,
                size: tree.size,
                extension
            });
        }
    }

    // Function to aggregate the file size and count for each file type
    function aggregate(files) {
        for (let file of files) {
            const { extension: key, size } = file;
            let value = extensionMap.get(key) || { count: 0, size: 0 };
            value.count++;
            value.size += size;
            extensionMap.set(key, value);
        }

        // Get sorted keys
        const keys = [...extensionMap.keys()].sort((a, b) => {
            return a > b ? 1 : a < b ? -1 : 0;
        });

        // Output the size and count information for each file type
        keys.forEach(key => {
            const value = extensionMap.get(key);
            const size = fmtK(value.size);
            console.log(`Ext '${ key }': Count: ${ value.count }, Size: ${ size }`);
        });
        console.log();
    }

    // Recurse through the tree
    visit(tree);

    // Aggregate per file type
    aggregate(files);
}

/**
 * Displays the directory tree
 * @param {string} string - One line of the file tree output
 */
function log(string) {
    if (displayTree) {
        console.log(string);
    }
}

// Start
listDirectory(tree, 0).then(() => {

    // Get file sizes
    processTree(tree);

    // Aggregate size/counts per file type
    getFileTypes(tree);

    // Output file list if requested
    if (displayList) {
        console.log('\nFile paths:');
        console.log(filePaths.join('\n'));
    }

    // Output Json if requested
    if (displayJson) {
        console.log('\nJSON:');
        console.log(JSON.stringify(tree, null, 2));
    }
});
