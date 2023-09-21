const inquirer = require('inquirer');
const db = require('./assets/js/queries.js');

const start = async () => {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            // ... Add other choices
            'Exit'
        ]
    });

    switch (answer.action) {
        case 'View all departments':
            const departments = await db.viewAllDepartments();
            console.table(departments[0]);
            start();
            break;
        // ... Add other cases

        case 'Exit':
            process.exit(0);
            break;
    }
};

start();
