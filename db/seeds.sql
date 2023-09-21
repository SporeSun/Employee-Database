USE company_db;

-- Seed Departments
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('HR');
INSERT INTO department (name) VALUES ('Finance');

-- Seed Roles
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 90000, (SELECT id FROM department WHERE name = 'Engineering'));
INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', 60000, (SELECT id FROM department WHERE name = 'Sales'));
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 75000, (SELECT id FROM department WHERE name = 'HR'));
INSERT INTO role (title, salary, department_id) VALUES ('Financial Analyst', 80000, (SELECT id FROM department WHERE name = 'Finance'));

-- Seed Employees
-- Note: For simplicity, managers are not set in this seed data. In a real-world scenario, you'd have more employee records and could then set the manager_id field accordingly.
INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Doe', (SELECT id FROM role WHERE title = 'Software Engineer'));
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jane', 'Smith', (SELECT id FROM role WHERE title = 'Sales Representative'));
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Alice', 'Johnson', (SELECT id FROM role WHERE title = 'HR Manager'));
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Bob', 'Brown', (SELECT id FROM role WHERE title = 'Financial Analyst'));
