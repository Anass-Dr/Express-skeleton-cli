#!/usr/bin/env node
import shell from 'shelljs';
import inquirer from 'inquirer';

function getUserInput() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
            validate: (input) => {
                if (!input) {
                    return 'Please enter a project name!';
                }
                return true;
            },
        },
        {
            type: 'list',
            name: 'database',
            message: 'Which database would you like to use?',
            choices: ['MySQL', 'MongoDB', 'No database'],
        },
        {
            type: 'list',
            name: 'databaseOrm',
            message: 'Which ORM would you like to use?',
            choices: ['Sequelize'],
            when: (answers) => answers.database === 'MySQL'
        },
        {
            type: 'list',
            name: 'databaseOrm',
            message: 'Which ORM would you like to use?',
            choices: ['Mongoose'],
            when: (answers) => answers.database === 'MongoDB'
        },
    ]);
}

// Introductory message
console.log("*".repeat(50));
console.log("Welcome to Express.js project skeleton creator!");
console.log("*".repeat(50));
console.log();
const answers = await getUserInput();
const db = answers.database === 'No database' ? '' : `-${answers.database.toLowerCase()}`;

if (answers.projectName === '.') shell.exec(`rm -Rf * && rm -Rf .* && rm * && rm .*`);
shell.exec(`git clone -b version/express${db} https://github.com/Anass-Dr/Nodejs-Skeletons.git ${answers.projectName}`);
shell.exec(`npm i`);
// Add Instructions after installation
console.log("*".repeat(50));
console.log(`Your project has been created successfully!`);
console.log(`To start your project, run the following commands:`);
console.log(`> cd ${answers.projectName}`);
console.log("Configure your environment variables in the .env file.");
console.log(`> node server.js`);
shell.exec(`rm -Rf .git`);
