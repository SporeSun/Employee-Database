const inquirer = require('inquirer');
const db = require('./assets/js/query.js');

const start = async () => {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (answer.action) {
        case 'View all departments':
            const departments = await db.viewAllDepartments();
            console.table(departments[0]);
            break;
        case 'View all roles':
            const roles = await db.viewAllRoles();
            console.table(roles[0]);
            break;
        case 'View all employees':
            const employees = await db.viewAllEmployees();
            console.table(employees[0]);
            break;
        case 'Add a department':
            const newDept = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the name of the new department:',
            });
            await db.addDepartment(newDept.name);
            console.log("Department added successfully!");
            break;
        case 'Add a role':
            const newRole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for this role:',
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter the department ID this role belongs to:',
                },
            ]);
            await db.addRole(newRole.title, newRole.salary, newRole.departmentId);
            console.log("Role added successfully!");
            break;
        case 'Add an employee':
            const newEmployee = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee:',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee:',
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter the role ID for this employee:',
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter the manager ID for this employee (or leave blank if none):',
                },
            ]);
            await db.addEmployee(newEmployee.firstName, newEmployee.lastName, newEmployee.roleId, newEmployee.managerId || null);
            console.log("Employee added successfully!");
            break;
        case 'Update an employee role':
            const update = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee you want to update:',
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter the new role ID for this employee:',
                },
            ]);
            await db.updateEmployeeRole(update.employeeId, update.roleId);
            console.log("Employee's role updated successfully!");
            break;
        case 'Exit':
            process.exit(0);
            break;
    }

    // Return to the main menu after each action
    start();
};

start();
