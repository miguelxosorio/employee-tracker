const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./connection');


function catalog() {
    // inquirer
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Welcome to the employee catalog, what would you like to do?",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "view all employees and employee data",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role",
            "update employee manager",
            "view employees by manager",
            "view employees by department",
            "delete a department",
            "delete a role",
        ]
    })
    .then((answer) => {
       if(answer.action === "view all departments") {
            viewAllDepartments();
       } else if (answer.action === "view all roles") {
            viewAllRoles();
       } else if (answer.action === "view all employees") {
            viewAllEmployees();
       } else if (answer.action === "view all employees and employee data") {
            viewAllEmployeesVerbose();
       } else if (answer.action === "add a department") {
            addDept();
       } else if (answer.action === "add a role") {
            addRole();
       } else if (answer.action === "add an employee") {
            addEmployee();
       } else if (answer.action === "update an employee role") {
            updateRole();
       } else if (answer.action === "update employee manager") {
            updateEmployeeManager();
       } else if (answer.action === "view employees by manager") {
            viewEmployeesByManager();
       } else if (answer.action === "view employees by department") {
            viewEmployeesByDepartment();
       } else if (answer.action === "delete a department") {
            deleteDepartment();
       } else if (answer.action === "delete a role") {
            deleteRole();
       }
    })
}

function viewAllDepartments (){
    db.query("SELECT * FROM department", (err, data) => {
        console.table(data)
        catalog();
    })   
}

function viewAllRoles () {
    db.query("SELECT * FROM role", (err, data) => {
        console.table(data)
        catalog();
    })
}

function viewAllEmployees () {
    db.query("SELECT * FROM employee", (err, data) => {
        console.table(data)
        catalog();
    })
}

function viewAllEmployeesVerbose () {
    db.query("SELECT employee.employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name, role.salary, CONCAT(empManager.first_name, ' ', empManager.last_name) AS manager FROM employee LEFT JOIN role ON role.role_id = employee.role_id LEFT JOIN department ON department.department_id = role.department_id LEFT JOIN employee empManager ON empManager.employee_id = employee.manager_id", (err, data) => {
        console.table(data)
        catalog();
    })
}

function addDept () {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Please add a department"
    })
    .then((answer) => {
        const params = [answer.department]
        db.query("INSERT INTO department (name) VALUES (?)", params, (err, data) => {
            viewAllDepartments();
        })
    }) 
}

function addRole () {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "please add a role"
        },
        {
            name: "salary",
            type: "input",
            message: "add a salary"
        },
        {
            name: "departmentid",
            type: "input",
            message: "add a department id"
        }
    ])
    .then((answer) => {
        const params = [answer.role, answer.salary, answer.departmentid]
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", params, (err, data) => {
            viewAllRoles();
        })
    })
}

function addEmployee () {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "add the employee's first name"
        },
        {
            name: "lastname",
            type: "input",
            message: "add the employee's last name"
        },
        {
            name: "roleid",
            type: "input",
            message: "add a role id"
        },
        {
            name: "managerid",
            type: "input",
            message: "add your manager's id"
        }
    ])
    .then((answer) => {
        const params = [answer.firstname, answer.lastname, answer.roleid, answer.managerid]
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", params, (err, data) => {
            viewAllEmployees();
        })
    })
}

function updateRole() {
    inquirer.prompt([
        {
            name: "updateRoleId",
            type: "input",
            message: "which role id do you want to update"
        },
        {
            name: "updateEmpId",
            type: "input",
            message: "add an employee id"
        }
    ])
    .then((answer) => {
        const params = [answer.updateRoleId, answer.updateEmpId]
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", params, (err, data) => {
            viewAllEmployees();
        })
    }) 
    
}

// add function to update employee managers -- NEED TO CORRECT QUERY
function updateEmployeeManager() {
    inquirer.prompt([
        {
            name: "manFirstName",
            type: "input",
            message: "What's the manager's first name?"
        },
        {
            name: "manLastName",
            type: "input",
            message: "What's the manager's last name?"
        },
        {
            name: "empId",
            type: "input",
            message: "add the employee id you want to where you want to update the manager"
        }
    ])
    .then((answer) => {
        const params = [answer.manFirstName, answer.manLastName, answer.empId]
        db.query("UPDATE employee SET manager_id = (SELECT employee_id FROM (SELECT employee_id FROM employee WHERE first_name = ? AND last_name = ?) AS x) WHERE employee_id = ?", params, (err, data) => {
            viewAllEmployees();
        })
    })
}

// add function to view employees by manager -- need to update function
function viewEmployeesByManager() {
    inquirer.prompt([
        {
            name:"manFirstName",
            type: "input",
            message: "what is the manager's first name?"
        },
        {
            name:"manLastName",
            type: "input",
            message: "what is the manager's last name?"
        }
    ])
    .then((answer) => {
        const params = [answer.manFirstName, answer.manLastName]
        db.query("SELECT * FROM employee WHERE manager_id = (SELECT employee_id FROM employee WHERE first_name = ? AND last_name = ?)", params, (err, data) => {
            viewAllEmployees();
        })
    })
}

// add function to view employees by department
function viewEmployeesByDepartment() {
    
}

// add function to delete departments
function deleteDepartment() {
    inquirer.prompt([
        {
            name: "delDept",
            type: "input",
            message: "what department do you want to delete?"
        }
    ])
    .then((answer) => {
        const params = [answer.delDept]
        db.query("DELETE FROM department WHERE name = ?", params, (err, data) => {
            viewAllDepartments();
        })
    })
}

// add function to delete roles,
function deleteRole() {
    inquirer.prompt([
        {
            name: "delRole",
            type: "input",
            message: "what role do you want to delete?"
        }
    ])
    .then((answer) => {
        const params = [answer.delRole]
        db.query("DELETE FROM role WHERE title = ?", params, (err, data) => {
            viewAllRoles();
        })
    })
}

// add function to delete employees
function deleteEmployee(){

}

// add function to view the total utilized budget of a department = combined salaries of employees in that department
function viewDepartmentBudget() {

}

module.exports = catalog;