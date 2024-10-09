const Borrow = require('../models/Borrow');
const User = require('../models/Users');
const Book = require('../models/Book');

// Add new book
exports.borrowBookFromLibrary = async (req, res) => {
    const { userID, bookID, borrowDate } = req.body;
    req.body.borrowDate = new Date(req.body.borrowDate).toLocaleString();
    try {
        const userData = await User.findById({ _id: userID });
        if (!userData) return res.status(404).json({ message: 'Error While fetching Book Details from DB' });
        const bookData = await Book.findById({ _id: bookID });
        const { title, author, ISBN, publishYear, genre } = bookData;
        const borrow = new Borrow(req.body);
        await borrow.save();
        const book = await Book.findByIdAndUpdate(bookID, { _id: bookID, title, author, ISBN, publishYear, genre, borrowedBySomeone: true }, { new: true });
        if (!book) return res.status(404).json({ message: 'Error While Updating Book Details' });
        res.status(201).json(borrow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getListAllBorrowedBooks = async (req, res) => {
    const borrowedBooksList = await Borrow.find()
        .populate({ path: 'userID', model: 'User', select: { name: 1, email: 1 } })
        .populate({ path: 'bookID', model: 'Book', select: { title: 1, author: 1, ISBN: 1, publishYear: 1, genre: 1 } })

    const result = borrowedBooksList.map((item) => {
        return { BorrowerID: item._id, BorrowerName: item.userID.name, BorrowerEmail: item.userID.email, title: item.bookID.title, author: item.bookID.author, ISBN: item.bookID.ISBN, publishYear: item.bookID.publishYear, genre: item.bookID.genre }
    });
    res.json(result);
};


exports.returnBorrowedBook = async (req, res) => {
    try {
        const returnBook = await Borrow.findByIdAndDelete(req.params.id);
        if (!returnBook) return res.status(404).json({ message: 'Book not assigned to User' });
        res.json({ message: 'Book Returned successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

