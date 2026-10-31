import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const books = await getDb().collection('books').find({}).toArray();
  return books;
};

const getBookById = async (id) => {
  const book = await getDb().collection('books').findOne({ id: id });
  return book;
};

export { getAllBooks,
   getBookById  };