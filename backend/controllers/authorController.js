const responseCodes = require('http-status-code')
'use Strict'
const { response } = require('express');
const mysql = require('mysql');
const con = mysql.createConnection({host:process.env.host, user:process.env.user, password:process.env.password, database:process.env.database});
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
    async function getAllAuthors(req, res){
        // con.connect(function(err){
        //     if(err) throw err;
        //     con.query(`SELECT * FROM author;`, function (err, result, fields){
        //         if(err) throw err;
        //         console.log('res:', result)
        //     })
        // })
        res.header("Access-Control-Allow-Origin", "*")
        // const rows = query('SELECT * FROM books;')
        const rows = [ { id: 1, firstName: 'J. K.', lastName: 'Rowling' },
        { id: 2, firstName: 'R. L.', lastName: 'Stein' },
        { id: 3, firstName: 'J. R. R.', lastName: 'Tolkein' },
        { id: 4, firstName: 'Nicholas', lastName: 'Sparks' },
        { id: 5, firstName: 'Stan', lastName: 'Lee' },
        { id: 6, firstName: 'Trevor', lastName: 'Noah' },
        { id: 7, firstName: 'Agatha', lastName: 'Christy' }]
        res.json(rows)
        return res.status(200)
    }
    
    async function getAuthor(req, res){
        const id = 1
        console.log('request ==> ', req.params.id)
        // const rows = query('SELECT * FROM books;')
        res.header("Access-Control-Allow-Origin", "*")
        const rows = [{ id: "1", firstName: "J. K.", lastName: "Rowling" }]
        res.json(rows)
        return res.status(200)
    }
    
    async function createAuthor(req, res){
        console.log('Create Author', req.query) //Front End connection working
    }
    
    async function editAuthor(req, res){
        console.log('Update Author', req.query) //Front End connection working
    }
    
    return {
        getAllAuthors: getAllAuthors,
        getAuthor: getAuthor,
        createAuthor: createAuthor,
        editAuthor: editAuthor
    }
}