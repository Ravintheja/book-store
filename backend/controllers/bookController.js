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
    async function getAllBooks(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
    
        try {
          const rows = await query('SELECT * FROM books;');
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async function getBook(req, res){
        console.log('request ==> ', req.params.id)
        res.header("Access-Control-Allow-Origin", "*");
    
        try {
          const rows = await query(`SELECT * FROM books WHERE isbn = "${req.params.id}";`);
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    async function createBook(req, res){
        console.log('Create Book', req.query)
        res.header("Access-Control-Allow-Origin", "*");
    
        try {
          const rows = await query(`INSERT INTO books (name, isbn, authorId) VALUES ("${req.query.bname}", "${req.query.isbn}", "${req.query.authId}");`);
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

    }
    
    async function editBook(req, res){
        console.log('Update Book', req.query) //Front End connection working
        res.header("Access-Control-Allow-Origin", "*");
    
        try {
          const rows = await query(`UPDATE books SET name = "${req.query.bName}", authorId = "${req.query.authId}" WHERE isbn = "${req.query.isbn}";`);
          console.log('Rows => ', rows);
          res.json(rows);
          return res.status(200);
        } catch (error) {
          console.error('Error fetching data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    return {
        getAllBooks: getAllBooks,
        getBook: getBook,
        createBook: createBook,
        editBook: editBook
    }
}