const express = require('express');
const Books = require('./books-model.js');
const router = express.Router();

// retrieve list of books
router.get('/', (req, res) => {
    Books.getBooks()
    .then(books => {
        res.status(200).json(books)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to get books'})
    });
})

// add new book, return full list
router.post('/', (req, res) => {
    Books.addBook(req.body)
        .then(book => {
            res.json(book)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to post new book." })
        })
})

// see one book by id
router.get('/:id', (req, res) => {
    Books.getBookById(req.params.id)
    .then((book) => {
        if (book) {
            res.status(200).json(book)
        } else {
            res.status(404).json({ message: "Book not found." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Error retrieving the book."})
    })
})

// get characters
router.get('/:id/characters', (req, res) => {
    Books.getBookById(req.params.id)
    .then((book) => {
        if (book) {
            let id = book[0].id
            Books.getCharacters(id)
            .then((characters) => {
                res.status(200).json(characters)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Error retrieving characters." })
            })
        } else {
            res.status(404).json({ message: "Book not found." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Error retrieving the book."})
    })
})

// make new character
router.post('/:id/characters', (req, res) => {
    Books.addCharacter(req.body) 
    .then((character) => {
        res.status(201).json(character)
    })
    .catch(err => console.log(err))
})

// edit character
router.put('/:id/character', (req, res) => {
    Books.getBookById(req.params.id)
    .then((book) => {
        if (book) {
            Books.update(character.id, req.body)
            .then((character) => {
                res.status(202).json('UPDATING CHARACTER: ', character.name)
            })
        }
    })
})

module.exports = router;
