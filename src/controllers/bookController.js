const bookService = require('../services/bookService')

const getAllBooks = (_req, res) => {
  try {
    const books = bookService.getAllBooks()
    res.send({ status: 'OK', data: books })
  } catch (error) {
    res.status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getBook = (req, res) => {
  const { params: { bookId } } = req
  if (!bookId) {
    res.status(400)
      .send({
        status: 'FAILED',
        data: { error: "Parameter ':bookId' can't not be empty" }
      })
  }

  try {
    const book = bookService.getBook(bookId)
    res.send({ status: 'Ok', data: book })
  } catch (error) {
    res.status(error?.status || 500)
      .send({
        status: 'FAILED',
        data: { error: error?.message || error }
      })
  }
}

const createNewBook = (req, res) => {
  const { body } = req
  if (
    !body.title ||
        !body.subtitle ||
        !body.author ||
        !body.publisher ||
        !body.pages ||
        !body.description
  ) {
    res.status(400)
      .send({
        status: 'FAILED',
        data: {
          error:
          "One of the following fields is missing or is empty in request body: 'title', 'subtitle', 'author', 'publisher', 'pages', 'description'"
        }
      })
    return
  }

  const newBook = {
    title: body.title,
    subtitle: body.subtitle,
    author: body.author,
    publisher: body.publisher,
    pages: body.pages,
    description: body.description
  }

  try {
    const createdBook = bookService.createNewBook(newBook)
    res.status(201).send({ status: 'OK', data: createdBook })
  } catch (error) {
    res.status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateBook = (req, res) => {
  const {
    body,
    params: { bookId }
  } = req

  if (!bookId) {
    res.status(400)
      .send({
        status: 'FAILED',
        data: { error: "Parameter ':bookId' can not be empty" }
      })
  }

  try {
    const updatedBook = bookService.updateBook(bookId, body)
    res.send({ status: 'OK', data: updatedBook })
  } catch (error) {
    res.status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteBook = (req, res) => {
  const { params: { bookId } } = req
  if (!bookId) {
    res.status(400)
      .send({
        status: 'FAILED',
        data: { error: "Parameter ':bookId' can not be empty" }
      })
  }

  try {
    bookService.deleteBook(bookId)
    res.status(204).send({ status: 'OK' })
  } catch (error) {
    res.status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createNewBook,
  updateBook,
  deleteBook
}
