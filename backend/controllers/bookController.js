const responseCodes = require('http-status-code')
'use Strict'
const { response } = require('express');
const mysql = require('mysql');
var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  })
var rows
module.exports = (app) => {
    async function query(sql) {
        const connection = await mysql.createConnection({host:process.env.host, user:process.env.user, password:process.env.password, database:process.env.database});
        
        await connection.query(sql, function(err,result, fields){
            if(err) throw err;
            rows = 'poopk'
            console.log(result)
        });
        return rows;
    }
    async function getAllBooks(req, res){
        res.header("Access-Control-Allow-Origin", "*")
        // const rows = query('SELECT * FROM books;')
        const rows = [{ name: 'Harry Potter', isbn: 'AA001', author: 'Jk Rowling'  },
        { name: 'Goosebumps', isbn: 'AA002', author: 'R. L. Stein' },
        {
          name: 'Lord of the Rings',
          isbn: 'AA003',
          author: 'J. R. Tolkein'
        },
        { name: 'Fear Street', isbn: 'AA004', author: 'R. L. Stein' },
        ]
        res.json(rows)
        return res.status(200)
    }
    
    async function getBook(req, res){
        console.log('request ==> ', req.params.id)
        // const rows = query(`SELECT * FROM books WHERE isbn =${req.params.id};`)
        res.header("Access-Control-Allow-Origin", "*")
        const rows = [{ name: "Harry Potter", isbn: "AA001", author: "J.K Rowling" }]
        res.json(rows)
        return res.status(200)
    }
    
    async function createBook(req, res){
        console.log('Create Book', req.query)
    }
    
    async function editBook(req, res){
        console.log('Update Book', req.query) //Front End connection working
    }
    
    return {
        getAllBooks: getAllBooks,
        getBook: getBook,
        createBook: createBook,
        editBook: editBook
    }
}