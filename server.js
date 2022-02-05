const express = require('express');
// const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const cTable = require('console.table');
const db = require('./db/connection');
const catalog = require('./db/catalog');

const PORT = process.env.PORT || 3001;
const app = express();

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      catalog();
    });
});

