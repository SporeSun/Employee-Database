const connection = require('./db.js');

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllDepartments() {
        return this.connection.promise().query("SELECT * FROM department");
    }

    viewAllRoles() {
        return this.connection.promise().query(
            `SELECT role.id, role.title, department.name AS department, role.salary 
             FROM role
             INNER JOIN department ON role.department_id = department.id`
        );
    }

    viewAllEmployees() {
        return this.connection.promise().query(
            `SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager 
             FROM employee e1
             LEFT JOIN employee e2 ON e1.manager_id = e2.id
             INNER JOIN role ON e1.role_id = role.id
             INNER JOIN department ON role.department_id = department.id`
        );
    }

    addDepartment(name) {
        return this.connection.promise().query("INSERT INTO department (name) VALUES (?)", [name]);
    }

    addRole(title, salary, departmentId) {
        return this.connection.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, departmentId]);
    }

    addEmployee(firstName, lastName, roleId, managerId) {
        return this.connection.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [firstName, lastName, roleId, managerId]);
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }
}

module.exports = new Database(connection);
