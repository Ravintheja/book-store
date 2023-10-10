'use Strict'

//Defining controllers
const BookController = require('./controllers/bookController')
const AuthorController = require('./controllers/authorController')

module.exports = (app) => {
    const bookController = BookController(app)
    const authorController = AuthorController(app)

    app.get('/books', bookController.getAllBooks)
    app.get('/book/:id', bookController.getBook)
    app.get('/authors', authorController.getAllAuthors)
    app.get('/author/:id', authorController.getAuthor)
    app.post('/book', bookController.createBook)
    app.post('/author', authorController.createAuthor)
    app.put('/book', bookController.editBook)
    app.put('/author', authorController.editAuthor)
}

