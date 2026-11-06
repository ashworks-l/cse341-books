import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const books = await getDb().collection('books').find({}).toArray();
  return books;
};

const getBookById = async (id) => {
  const book = await getDb().collection('books').findOne({ id });
  return book;
};

const authorExists = async (authorId) => {
  const author = await getDb().collection('authors').findOne({
    id: authorId
  });

  return Boolean(author);
};

const createBook = async (book) => {
  await getDb().collection('books').insertOne(book);
  return book;
};

const updateBook = async (id, book) => {
  await getDb().collection('books').updateOne(
    { id },
    { $set: book }
  );

  return { id, ...book };
};

const deleteBook = async (id) => {
  return await getDb().collection('books').deleteOne({ id });
};

export {
  getAllBooks,
  getBookById,
  authorExists,
  createBook,
  updateBook,
  deleteBook
};