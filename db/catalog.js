const inquirer = require('inquirer');
// const mysql = require('mysql2');
const cTable = require('console.table');
const { message } = require('statuses');

function catalog() {
    // inquirer
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Welcome to the employee catalog, what would you like to do?',
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
    .then((choice) =>{
       switch (choice.action) {
        case "view all departments":
            viewAlldepartments();
            break;
        }
    })
}

function viewAlldepartments (){
    inquirer.prompt({
        name: "department",
        type: "list",
        message: 'Which department would you like to choose?',
        choices: [
            'Administration',
            'Engineering',
            'Accounting',
            'Sales'
        ]
    })
}

module.exports = catalog;