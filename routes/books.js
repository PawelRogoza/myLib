const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// pobranie listy wszystkich dodanych książek
router.get('/', (req, res) => {
    Book.find()
        .then((book) => {
            res.status(200).json({
                message: "Lista wszystkich dodanych książek",
                books: book,
            });
        }).catch((error => res.status(500).json(error.message)));
});

// pobranie książki po ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Book.findById(id)
        .then((book) => {
            res.status(200).json({
                wiadomość: 'Książka z ID: ' + id,
                info: book,
            });
        })
        .catch((error) => res.status(500).json(error.message));
});

// dodawanie książek
router.post("/", (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        price: req.body.price,
        toRead: req.body.toRead
    });
    book.save()
        .then((addedBook) => {
            res.status(201).json({ // status 201 = created
                message: "Dodano książkę",
                book: addedBook,
            });
        }).catch(error => {
            res.json(error.message);
        })
})

// usuwanie książek po ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Book.findByIdAndDelete(id)
        .then((book => {
            res.status(200).json({
                message: "Usunięto książke o ID: " + id,
                book: book,
            });
        })).catch((error => res.status(500).json(error.message)));
});

// modyfikacja książek po ID
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Book.findByIdAndUpdate(id,
        {
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate,
            price: req.body.price,
            toRead: req.body.toRead
        },
        {new: true}) // aby wyświetlić nam podmienioną książkę (zmienioną) a nie przed zmianą
    .then((book => {
            res.status(200).json({
                message: "Zmodyfikowano książkę o ID: " + id,
                book: book,
            });
        })).catch((error => res.status(500).json(error.message)));
});

module.exports = router;
