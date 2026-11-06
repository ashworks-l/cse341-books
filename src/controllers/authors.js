import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks,
} from '../models/authors.js';

// GET: Obtener todos los autores
const getAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();

    return res.status(200).json(authors);
  } catch (error) {
    console.error('Error retrieving authors:', error);

    return res.status(500).json({
      error: 'Internal server error.',
    });
  }
};

// GET: Obtener un autor por su ID
const getAuthorByIdHandler = async (req, res) => {
  try {
    const author = await getAuthorById(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Error retrieving author:', error);

    return res.status(500).json({
      error: 'Internal server error.',
    });
  }
};

// POST: Crear un autor
const createAuthorHandler = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;

    if (!id || !name || birthYear === undefined || birthYear === null) {
      return res.status(400).json({
        message: 'Please provide id, name, and birthYear.',
      });
    }

    const existingAuthor = await getAuthorById(id);

    if (existingAuthor) {
      return res.status(400).json({
        message: 'An author with this ID already exists.',
      });
    }

    const newAuthor = {
      id,
      name,
      birthYear,
    };

    await createAuthor(newAuthor);

    return res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error);

    return res.status(500).json({
      error: 'Internal server error.',
    });
  }
};

// PUT: Actualizar un autor
const updateAuthorHandler = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    const { id } = req.params;

    if (!name || birthYear === undefined || birthYear === null) {
      return res.status(400).json({
        message: 'Please provide name and birthYear.',
      });
    }

    const existingAuthor = await getAuthorById(id);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    const updatedAuthor = await updateAuthor(id, {
      name,
      birthYear,
    });

    return res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error('Error updating author:', error);

    return res.status(500).json({
      error: 'Internal server error.',
    });
  }
};

// DELETE: Eliminar un autor
const deleteAuthorHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAuthor = await getAuthorById(id);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    const hasBooks = await authorHasBooks(id);

    if (hasBooks) {
      return res.status(409).json({
        message: 'Cannot delete an author who has books.',
      });
    }

    await deleteAuthor(id);

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting author:', error);

    return res.status(500).json({
      error: 'Internal server error.',
    });
  }
};

export {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
};
