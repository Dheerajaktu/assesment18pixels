const express = require('express');
const { addNewUser, getUserById, deleteUser, getAllUsers, updateUser } = require('../controllers/userController');
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { borrowBookFromLibrary, getListAllBorrowedBooks, returnBorrowedBook } = require('../controllers/borrowController');
const { generateToken } = require('../utils/jwtUtils');

const { protect } = require('../middlewares/auth');
const router = express.Router();


/* Default Route */
router.get('/', (req, res) => res.send({ message: 'Welcome to Library Management' }));

/* Generate token */
router.get('/token/get-token/:id', (req, res) => {
    if (!req.params.id) res.send({ message: 'Please provide User ID to generate Access Token' });
    const token = generateToken(req.params.id);
    res.send({ Authorization: token });
})

/* User Routes */
router.post('/user/add-new', protect, addNewUser);
router.get('/user/get-all-user', protect, getAllUsers);
router.get('/user/:id', protect, getUserById);
router.put('/user/:id', protect, updateUser);
router.delete('/user/:id', protect, deleteUser);


/* Book Routes */
router.post('/book/add-new', protect, addBook);
router.get('/book/get-all-books', protect, getBooks);
router.get('/book/:id', protect, getBookById);
router.put('/book/:id', protect, updateBook);
router.delete('/book/:id', protect, deleteBook);


/* Borrow Book Routes */
router.post('/borrow/borrow-book', protect, borrowBookFromLibrary);
router.get('/borrow/get-all-borrowed-books', protect, getListAllBorrowedBooks);
router.delete('/borrow/return-book/:id', protect, returnBorrowedBook);




module.exports = router;
