-- Consolidated Employee Data
SELECT employee.employee_id,
       employee.first_name,
       employee.last_name,
       role.title AS job_title,
       department.name,
       role.salary,
       CONCAT(empManager.first_name, ' ', empManager.last_name) AS manager
FROM employee 
LEFT JOIN role 
    ON role.role_id = employee.role_id  
LEFT JOIN department 
    ON department.department_id = role.department_id
LEFT JOIN employee empManager
    ON empManager.employee_id = employee.manager_id;