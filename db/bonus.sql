-- update employee managers query
-- UPDATE employee SET manager_id = (SELECT employee_id FROM (SELECT employee_id FROM employee WHERE first_name = 'Steve' AND last_name = 'Bush') AS x)
-- WHERE employee_id = 3;

-- view employees by manager
-- SELECT * 
-- FROM employee
-- WHERE manager_id = 
-- (SELECT employee_id FROM employee WHERE first_name = 'John' AND last_name = 'Doe');

-- view employees by department
-- SELECT *
-- FROM employee
-- WHERE role_id IN
-- (SELECT role_id FROM role WHERE department_id = (SELECT department_id FROM department WHERE name = 'Engineering'));

-- total utilized budget
-- SELECT COUNT(*), department.name, SUM(role.salary)
-- FROM employee 
-- LEFT JOIN role 
--     ON role.role_id = employee.role_id  
-- LEFT JOIN department 
--     ON department.department_id = role.department_id
-- WHERE department.name = 'Engineering'
-- GROUP BY department.name;

--DELETE FROM department WHERE name = 'TEST DEPT';