
import { getAllAuthors } from '../models/authors.js';

const getAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();

    return res.status(200).json(authors);
  } catch (error) {
    console.error('Error retrieving authors:', error.message);

    return res.status(500).json({
      error: 'Internal server error.',
    });
  }
};

export { getAuthorsHandler };
