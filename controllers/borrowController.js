const Borrow = require('../models/Borrow');

// Add new book
exports.borrowBookFromLibrary = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all books with filters
exports.getListAllBorrowedBooks = async (req, res) => {
    const { author, genre, year } = req.query;
    const query = {};
    if (author) query.author = author;
    if (genre) query.genre = genre;
    if (year) query.publishYear = year;
    
    const books = await Book.find(query).skip(req.query.skip).limit(req.query.limit);
    res.json(books);
};

// Get book by ID
exports.returnBorrowedBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

