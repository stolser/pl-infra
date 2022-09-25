const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

try {
    // get input params defined in action.yaml
    let dirPath = core.getInput('dir-path');
    let fileExt = core.getInput('file-ext');

    let matchedFiles = findByExtension(dirPath, fileExt);
    let totalNumberOfLinks = 0;

    console.log(`matchedFiles = ${matchedFiles}`)

    // for (const file of matchedFiles) {
    //     const allContents = fs.readFileSync(file, 'utf-8');
    //
    //     console.log(`=== Links found in file '${file}' ===`);
    //
    //     let numberOfLinks = 0;
    //     let currentLineNumber = 1;
    //     allContents.split(/\r?\n/).forEach((line) => {
    //         if (line.includes("http://") || line.includes("https://")){
    //             numberOfLinks++;
    //             console.log(`line ${currentLineNumber}: `, line);
    //         }
    //         currentLineNumber++;
    //     });
    //     console.log(`Total number of links in '${file}': `, numberOfLinks);
    // }

    core.setOutput("total-number", totalNumberOfLinks);


    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}

const findByExtension = async (dir, ext) => {
    const matchedFiles = [];
    const allFilesInDir = await readdir(dir);

    for (const file of allFilesInDir) {
        const fileExt = path.extname(file);

        if (fileExt === `.${ext}`) {
            matchedFiles.push(file);
        }
    }

    return matchedFiles;
};
