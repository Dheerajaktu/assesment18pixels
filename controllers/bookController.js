const Book = require('../models/Book');

// Add new book
exports.addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all books with filters
exports.getBooks = async (req, res) => {
    const { author, genre, year } = req.query;
    const query = {};
    if (author) query.author = author;
    if (genre) query.genre = genre;
    if (year) query.publishYear = year;
    
    const books = await Book.find(query).skip(req.query.skip).limit(req.query.limit);
    res.json(books);
};

// Get book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update book by ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
