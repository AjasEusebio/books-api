/* eslint-disable no-useless-catch */
const Book = require('../database/Book')
const { v4: uuid } = require('uuid')

const getAllBooks = () => {
  try {
    const allBooks = Book.getAllBooks()
    return allBooks
  } catch (error) {
    throw error
  }
}

const getBook = (bookId) => {
  try {
    const book = Book.getBook(bookId)
    return book
  } catch (error) {
    throw error
  }
}

const createNewBook = (newBook) => {
  const bookToInsert = {
    id: uuid(),
    ...newBook,
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
  }

  try {
    const createdBook = Book.createNewBook(bookToInsert)
    return createdBook
  } catch (error) {
    throw error
  }
}

const updateBook = (bookId, changes) => {
  try {
    const updatedBook = Book.updateBook(bookId, changes)
    return updatedBook
  } catch (error) {
    throw error
  }
}

const deleteBook = (bookId) => {
  try {
    Book.deleteBook(bookId)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createNewBook,
  updateBook,
  deleteBook
}
