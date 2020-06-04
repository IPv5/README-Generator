const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "github",
            message: "Enter your GitHub username"
        },
        {
            type: "input",
            name: "title",
            message: "Enter the title of your project"
        },
        {
            type: "input",
            name: "Description",
            message: "Provide a short description of your project"
        },
        {
            type: "input",
            name: "contents",
            message: "Table of contents"
        },
        {
            type: "input",
            name: "install",
            message: "Installation procedure"
        },
        {
            type: "input",
            name: "usage",
            message: "Usage procedure"
        },
        {
            type: "input",
            name: "license",
            message: "Enter license"
        },
        {
            type: "input",
            name: "contributors",
            message: "Enter any contributors"
        },
        {
            type: "input",
            name: "tests",
            message: "Test procedure"
        }
    ]);
}

function generateReadMe(answers) {
    return `

# Author: 
${answers.github}

## Description of project: 
${answers.description}

## Table of Contents: 
${answers.contents}

## Installation Process: 
${answers.install}

## Usage: 
${answers.usage}

## License: 
${answers.license}

## Contributors: 
${answers.contributors}

## Tests: 
${answers.tests}

    `
}

promptUser()
    .then(function(answers) {
        const readMe = generateReadMe(answers);

        return writeFileAsync("README.md", readMe);
    })
    .then(function() {
        console.log("Successfully created a README.md");
    })
    .catch(function(err) {
        console.log(err);
    });