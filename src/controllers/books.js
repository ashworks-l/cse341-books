
import {
  getAllBooks,
  getBookById,
  authorExists,
  createBook,
  updateBook,
  deleteBook
} from '../models/books.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const getBookByIdHandler = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error retrieving book:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const createBookHandler = async (req, res) => {
  try {
    const book = req.body;

    if (!book.id || !book.title || !book.authorId) {
      return res.status(400).json({
        message: 'id, title and authorId are required'
      });
    }

    const exists = await authorExists(book.authorId);

    if (!exists) {
      return res.status(400).json({
        message: 'Author does not exist'
      });
    }

    const existingBook = await getBookById(book.id);

    if (existingBook) {
      return res.status(409).json({
        message: 'Book already exists'
      });
    }

    await createBook(book);

    return res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const book = req.body;

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    if (book.authorId) {
      const exists = await authorExists(book.authorId);

      if (!exists) {
        return res.status(400).json({
          message: 'Author does not exist'
        });
      }
    }

    delete book._id;
    delete book.id;

    await updateBook(id, book);

    return res.status(200).json({
      id,
      ...book
    });
  } catch (error) {
    console.error('Error updating book:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    await deleteBook(id);

    return res.status(200).json({
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};
