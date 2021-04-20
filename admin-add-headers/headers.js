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

const FileService = require('./file-service.js');

// let config = {
//     targetPath: './',
//     type: '.sh',
//     defaultShebang: '#!/usr/bin/env bash',
//     defaultHeader: 'APACHE',
//     headers: ['./headers/bash.Apache-2.0.tpl', './headers/bash.pso.tpl']
// };

let config = {
    targetPath: './',
    type: '.js',
    defaultShebang: '',
    defaultHeader: 'APACHE',
    headers: ['./headers/js.Apache-2.0.tpl', './headers/js.pso.tpl']
};

let shebangs = [
    '#!/usr/bin/env sh',
    '#!/usr/bin/env bash',
    '#!/bin/sh',
    '#!/bin/bash'
];

// get headers
let headers = FileService.getMultipleFileContents(config.headers);
console.log(headers);

// get template
let templateContent = FileService.getHeader(config.defaultHeader, config.type);
console.log(templateContent);

// find all files that match config.type
var filteredFiles = FileService.getFilesByExtension(config.targetPath, config.type);
console.log(filteredFiles);

// read all files
const fs = require('fs')

for (let fileIndex in filteredFiles) {
    let file = filteredFiles[fileIndex];
    console.log(file);

    var contents = fs.readFileSync(file, 'utf8');

    for (let i in shebangs) {
        let shebang = shebangs[i];
        contents = contents.replace(/^shebang/i, '');
    }
    for (let i in headers) {
        let header = headers[i];
        contents = contents.replace(header, '');
    }

    contents = contents.replace(/\n\s*\n/g, '\n\n');
    console.log(contents);

    let shebang = config.defaultShebang === '' ? '' :
        config.defaultShebang + '\n';

    let replacedContents = shebang +
        templateContent + '\n' +
        contents;

    fs.writeFileSync(file, replacedContents);
}