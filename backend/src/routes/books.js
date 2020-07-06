const controllers = require('../controllers/books')
const {auth} = require('../middlewares')
///
///books
///
module.exports = (app) => {
    app.get('/api/books', controllers.bookList)
    app.post('/api/add',auth, controllers.addBook)

    app.get('/api/bookinfo/:id', controllers.bookDetail)
    app.put('/api/books/:id',auth, controllers.updateBook)
    app.delete('/api/books/:id',auth, controllers.deleteBook)
}