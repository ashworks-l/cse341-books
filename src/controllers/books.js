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
    const { id, authorId, title, publicationDate } = req.body;

    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'id, authorId, title and publicationDate are required'
      });
    }

    const exists = await authorExists(authorId);

    if (!exists) {
      return res.status(400).json({
        message: 'Author does not exist'
      });
    }

    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'Book already exists'
      });
    }

    const newBook = { id, authorId, title, publicationDate };

    await createBook(newBook);

    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId, title, publicationDate } = req.body;

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'authorId, title and publicationDate are required'
      });
    }

    const exists = await authorExists(authorId);

    if (!exists) {
      return res.status(400).json({
        message: 'Author does not exist'
      });
    }

    const updatedBook = { authorId, title, publicationDate };

    await updateBook(id, updatedBook);

    return res.status(200).json({
      id,
      ...updatedBook
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
    const { id } = req.params;

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    await deleteBook(id);

    return res.status(204).send();
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
