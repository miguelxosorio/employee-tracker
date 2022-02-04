INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Engineering'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Marketer', 90000, 1),
    ('Engineer', 95000, 2),
    ('Accountant', 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 1),
    ('Steve', 'Bush', 2, 1),
    ('Jane', 'Doe', 3, 1);