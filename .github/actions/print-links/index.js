const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs');

try {
    // get input param `file-path` defined in action.yaml
    let pathToFile = core.getInput('file-path');
    const allContents = fs.readFileSync(pathToFile, 'utf-8');

    console.log(`=== Links found in file '${pathToFile}' ===`);

    let numberOfLinks = 0;
    let currentLineNumber = 1;
    allContents.split(/\r?\n/).forEach((line) => {
        if (line.includes("http://") || line.includes("https://")){
            numberOfLinks++;
            console.log(`line ${currentLineNumber}: `, line);
        }
        currentLineNumber++;
    });
    console.log(`Total number of links in '${pathToFile}': `, numberOfLinks);

    core.setOutput("number", numberOfLinks);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}
