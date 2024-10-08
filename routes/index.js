const express = require('express');
const { addNewUser, getUserById, deleteUser, getAllUsers, updateUser } = require('../controllers/userController');
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { borrowBookFromLibrary, getListAllBorrowedBooks, returnBorrowedBook } = require('../controllers/borrowController');

const { protect } = require('../middlewares/auth');
const router = express.Router();


/* Default Route */
router.get('/', (req, res) => res.send({ message: 'Welcome to Library Management' }));

/* User Routes */
router.post('/user/add-new', addNewUser);
router.get('/user/get-all-user', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


/* Book Routes */
router.post('/book/add-new', addBook);
router.get('/book/get-all-books', getBooks);
router.get('/book/:id', getBookById);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);


/* Borrow Book Routes */
router.post('/borrow/borrow-book', borrowBookFromLibrary);
router.get('/borrow/show-all-borrowed-books', getListAllBorrowedBooks);
router.put('/borrow/return-book/:id', returnBorrowedBook);




module.exports = router;
