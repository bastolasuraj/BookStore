const {Book} = require("../models")
exports.bookList = async (req, res) => {
    const list = await Book.find()
    res.status(200).send({
        data: list
    })
}
exports.addBook = async (req, res) => {
    new Book(req.body).save().then((newBook) => {
        console.log(newBook)
        res.status(301).send({
            message: "Book Created Successfully",
            data: newBook
        })
    }).catch((error) => {
        res.status(501).send({
            error: error.message,
            data: null
        })
    })
}
exports.updateBook = async (req, res) => {
    let book = await Book.findById(req.params.id)
    if (book) {
        book = Book.updateOne({_id: req.params.id}, {$set: req.body})
    }
    res.status(301).send({
        message: "Update Successful",
        data: book
    })
}
exports.deleteBook = async (req, res) => {
    let book = await Book.findById(req.params.id)
    if (book) {
        book = await Book.remove({_id: req.params.id})
    }
    res.status(301).send({
        message: "Deleted Book",
        data: book
    })
}
exports.bookDetail = async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.status(200).send({
        message: "Book Detail",
        data: book
    })
}