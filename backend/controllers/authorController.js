const responseCodes = require('http-status-code')
'use Strict'
const { response } = require('express');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });

async function query(sql) {
return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
    if (err) {
        reject(err);
        return;
    }
    connection.query(sql, (err, result, fields) => {
        connection.release(); // Release the connection when done
        if (err) {
        reject(err);
        return;
        }
        resolve(result);
    });
    });
});
}

module.exports = (app) => {
    async function getAllAuthors(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        try {
          const rows = await query('SELECT * FROM author;');
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    async function getAuthor(req, res){
        console.log('request ==> ', req.params.id)
        res.header("Access-Control-Allow-Origin", "*");
        try {
          const rows = await query(`SELECT * FROM author WHERE id ="${req.params.id}";`);
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    async function createAuthor(req, res){
        console.log('Create Author', req.query)
        res.header("Access-Control-Allow-Origin", "*");
    
        try {
          const rows = await query(`INSERT INTO author (id, firstName, lastName) VALUES ("${req.query.id}", "${req.query.firstName}", "${req.query.lastName}");`);
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    async function editAuthor(req, res){
        console.log('Update Author', req.query)
        res.header("Access-Control-Allow-Origin", "*");
    
        try {
          const rows = await query(`UPDATE author SET firstName = "${req.query.fname}", lastName = "${req.query.lname}" WHERE id = "${req.query.authId}";`);
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    return {
        getAllAuthors: getAllAuthors,
        getAuthor: getAuthor,
        createAuthor: createAuthor,
        editAuthor: editAuthor
    }
}