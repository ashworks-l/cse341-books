
import express from 'express';
import {
  getBooksHandler,
  getBookByIdHandler,
} from './controllers/books.js';

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
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/books/:id', getBookByIdHandler);

export default router;
