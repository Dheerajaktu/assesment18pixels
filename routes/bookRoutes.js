const express = require('express');
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
