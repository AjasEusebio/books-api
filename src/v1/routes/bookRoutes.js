const express = require('express')
const router = express.Router()
const bookController = require('../../controllers/bookController')

router
  .get('/', bookController.getAllBooks)
  .get('/:bookId', bookController.getBook)
  .post('/', bookController.createNewBook)
  .patch('/:bookId', bookController.updateBook)
  .delete('/:bookId', bookController.deleteBook)

module.exports = router
