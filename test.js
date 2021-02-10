#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

//  切换路径，默认在.git/hooks目录下执行
//  const rootPosition = path.resolve(__dirname, '..', '..');
const rootPosition = path.resolve(__dirname);

const targetPath = path.resolve(rootPosition, "./plugin/pop");
let fileNames = fs.readdirSync(targetPath);

let usedFileNames = ['pop.html', 'index.html', 'common.css', 'app.css', 'common.bundle.js', 'app.bundle.js', 'image'];

//  删除调试过程中出现的文件
fileNames.forEach(item => {
    if (!usedFileNames.includes(item)) {
        const deletePath = path.resolve(targetPath, item);
        fs.unlinkSync(deletePath);
    }
})

