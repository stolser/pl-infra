const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs');

try {
    // get input param `title` defined in action.yaml
    const title = core.getInput('title');
    console.log(title);

    const allContents = fs.readFileSync('./README.md', 'utf-8');
    let numberOfLinks = 0;
    let currentLineNumber = 1;
    allContents.split(/\r?\n/).forEach((line) => {
        if (line.includes("http://") || line.includes("https://")){
            numberOfLinks++;
            console.log(`line ${currentLineNumber}: `, line);
        }
        currentLineNumber++;
    });
    console.log('Total number of links in the root README.md: ', numberOfLinks);

    core.setOutput("number", numberOfLinks);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}
