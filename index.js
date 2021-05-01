const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
var fif = require('find-in-files');

try {

    const keyword = core.getInput('scan-keyword');
    const codebasepath = core.getInput('codebase-path');
    const extension = core.getInput('extension-filter');
    extension.concat('$');
    console.log(`Searching for ${keyword} in ${codebasepath}!`);

    let scanResult = "";
    fif.find(keyword, codebasepath, extension)
        .then(function(results) {
            for (let result in results) {
                let res = results[result];
                let msg = 'Found "' + res.matches[0] + '" ' + res.count
                    + ' times in "' + result + '"';
                console.log(msg);
                scanResult.concat(msg+ "\r\n");
                console.log(scanResult);
            }
        });
    console.log(scanResult);
    core.setOutput("result", scanResult);
} catch (error) {
    core.setFailed(error.message);
}