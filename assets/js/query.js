const connection = require('./db.js');

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    // Example: View all departments
    viewAllDepartments() {
        return this.connection.promise().query("SELECT * FROM department");
    }

    // Add other queries as needed
}

module.exports = new Database(connection);
