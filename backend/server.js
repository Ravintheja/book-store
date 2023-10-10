const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config();

const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

require('./router')(app) //Defining route file

app.use(cors());
app.use(bodyParser.json());

// const db = require('./repositories/dbCon')
// db.connect()

app.listen(port, () => {
    console.log('Server is running on port: ', port)
});