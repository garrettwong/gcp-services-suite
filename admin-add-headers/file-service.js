// Copyright 2021 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require('fs')

function getHeaderFileByType(type, ext) {
    ext = ext.replace('.', '');

    let HEADERS = {
        PSO: `./headers/${ext}.pso.tpl`,
        APACHE: `./headers/${ext}.Apache-2.0.tpl`
    };
    return HEADERS[type.toUpperCase()];
}

function getHeader(headerType, ext) {
    let headerFile = getHeaderFileByType(headerType, ext);

    try {
        switch (ext) {
            default:
                const data = fs.readFileSync(headerFile, 'utf8')
                return data;
        }
    } catch (err) {
        console.error(err)
    }
    return '';
}

function getFilesByExtension(dir, ext) {
    var filteredFiles = [];
    var files = fs.readdirSync(dir);
    filteredFiles = files.filter(file => file.endsWith(ext));
    return filteredFiles;
}

function getMultipleFileContents(filePaths) {
    let getMultipleFileContents = {};
    try {
        for (let i in filePaths) {
            let filePath = filePaths[i];
            const data = fs.readFileSync(filePath, 'utf8')
            getMultipleFileContents[filePath] = data;
        }
    } catch (err) {
        console.error(err)
    }
    return getMultipleFileContents
}

module.exports = {
    getHeader,
    getFilesByExtension,
    getMultipleFileContents
}