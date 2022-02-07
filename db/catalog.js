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
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role"
        ]
    })
    .then((answer) => {
       if(answer.action === "view all departments") {
            viewAllDepartments();
       } else if (answer.action === "view all roles") {
            viewAllRoles();
       } else if (answer.action === "view all employees") {
            viewAllEmployees();
       } else if (answer.action === "add a department") {
            addDept();
       } else if (answer.action === "add a role") {
            addRole();
       } else if (answer.action === "add an employee") {
            addEmployee();
       } else if (answer.action === "update an employee role") {
            updateRole();
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

module.exports = catalog;