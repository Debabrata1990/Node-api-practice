var express = require('express');


var router = function (Book) {
    var bookRouter = express.Router();

    var bookController = require('../controller/bookController')(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else
                res.status(404).send('book not found');
        });
    });
    bookRouter.route('/:bookId')
        .get(bookController.getById)
        .put(bookController.putById)
        .patch(bookController.patchById)
        .delete(bookController.deleteById);

    return bookRouter;
};

module.exports = router;