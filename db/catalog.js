const inquirer = require('inquirer');
// const mysql = require('mysql2');
const cTable = require('console.table');

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
}

module.exports = catalog;