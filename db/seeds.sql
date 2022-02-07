INSERT INTO department (name)
VALUES
    ('Administration'),
    ('Engineering'),
    ('Accounting'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Administrator', 90000, 1),
    ('Engineer', 95000, 2),
    ('Accountant', 85000, 3),
    ('Marketer', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 2, NULL),
    ('Steve', 'Bush', 2, 1),
    ('Jane', 'Doe', 4, 1);