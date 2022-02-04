INSERT INTO department (name)
VALUES
    ('Nursing');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Director of Nursing', 90000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 1);