/* eslint-disable no-throw-literal */
const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const getAllBooks = () => {
  try {
    return DB.books
  } catch (error) {
    throw new Error({ status: 500, message: error })
  }
}

const getBook = (bookId) => {
  try {
    const book = DB.books.find((book) => book.id === bookId)
    if (!book) {
      throw {
        status: 400,
        message: `Can't find book with the id '${bookId}'`
      }
    }
    return book
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

const createNewBook = (newBook) => {
  try {
    const isAlreadyAdded = DB.books.findIndex((book) => book.title === newBook.title) > -1

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Book with the title '${newBook.title}' already exists`
      }
    }

    DB.books.push(newBook)
    saveToDatabase(DB)
    return newBook
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const updateBook = (bookId, changes) => {
  try {
    const isAlreadyAdded = DB.books.findIndex((book) => book.title === changes.title) > -1
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Book with the title '${changes.title}' already exists`
      }
    }

    const indexForUpdate = DB.books.findIndex(
      (book) => book.id === bookId
    )

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find book with the id '${bookId}'`
      }
    }

    const updatedBook = {
      ...DB.books[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }

    DB.books[indexForUpdate] = updatedBook
    saveToDatabase(DB)
    return updatedBook
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const deleteBook = (bookId) => {
  try {
    const indexForDeletion = DB.books.findIndex(
      (book) => book.id === bookId
    )

    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find book with the id '${bookId}'`
      }
    }

    DB.books.splice(indexForDeletion, 1)
    saveToDatabase(DB)
  } catch (error) {
    throw {
      status: error?.status || 500, message: error?.message || error
    }
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createNewBook,
  updateBook,
  deleteBook
}
