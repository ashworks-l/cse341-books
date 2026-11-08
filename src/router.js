
import express from 'express';

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from './controllers/books.js';

import {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
} from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - authorId
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               authorId:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Invalid request, duplicate book ID, or author does not exist
 *       500:
 *         description: Server error
 */
router.post('/books', createBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid request or author does not exist
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put('/books/:id', updateBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete('/books/:id', deleteBookHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Authors retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/authors', getAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author retrieved successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get('/authors/:id', getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post('/authors', createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author has books
 *       500:
 *         description: Server error
 */
router.delete('/authors/:id', deleteAuthorHandler);

export default router;
