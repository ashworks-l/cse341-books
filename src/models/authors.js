
import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
  const db = getDb();

  return await db.collection('authors').find({}).toArray();
};

export { getAllAuthors };
