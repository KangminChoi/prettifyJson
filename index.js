#!/usr/bin/env node

const package = require('./package.json');
const program = require('commander');
const fs = require('fs');

const tabSize = 2;

program
  .version(package.version)
  .name(package.name)
  .usage("[options]")
  .option('-s, --src <src>', 'source path')
  .option('-d, --dst <dst>', 'destination path')
  .parse(process.argv);

if (program.src == undefined || program.dst == undefined) {
  program.help();
  process.exit(-1);
}

(function (srcPath, dstPath) {
  try {
    if (!fs.existsSync(srcPath)) {
      console.error(`Failure! '${srcPath}' does not exist`);
      return ;
    }

    const rawJson = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    const prettifiedJson = JSON.stringify(rawJson, null, tabSize);
    fs.writeFileSync(dstPath, prettifiedJson, 'utf8');

    console.log(`Success! '${dstPath}' has been created`);
  } catch (e) {
    console.error(`Failure! ${e.name}. ${e.message}`);
  }
})(program.src, program.dst);
