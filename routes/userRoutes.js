const express = require('express');
const { addNewUser, getUserById, deleteUser, getAllUsers, updateUser} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/add-new', protect, addNewUser);
router.get('/get-all', getAllUsers);
router.get('/:id', getBookById);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
