const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'color',
            message: 'What is your favorite color, which will be used as a background color for cards : \n'
        }
    ]);
}

async function init() {
    try {
        const answers = await promptUser();
    } catch(err) {
        console.log(err);
    }
}

init();
