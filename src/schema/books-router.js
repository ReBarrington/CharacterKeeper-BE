const express = require('express');
const Books = require('./books-model.js');
const router = express.Router();

// Middleware
const validBook = (req, res, next) => {
    Books.getBookById(req.params.id)
        .then((book) => {
            if (book.length > 0) {
                next();
            } else {
                res.status(404).json({ message: 'Book not found.' });
            }
        })
}

// retrieve list of books
router.get('/', (req, res) => {
    Books.getBooks()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: 'Failed to get books.' });
        });
});

// add new book, return full list
router.post('/', (req, res) => {
    Books.addBook(req.body)
        .then(book => {
            res.status(201).json(book);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Failed to post new book.' });
        });
});

// see one book by id
router.get('/:id', (req, res) => {
    Books.getBookById(req.params.id)
        .then((book) => {
            if (book.length > 0) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving the book.' });
        });
});

// get characters
router.get('/:id/characters', validBook, (req, res) => {
    Books.getCharacters(req.params.id) 
        .then((characters) => {
            if (characters) {
                res.status(200).json(characters)
            } else {
                res.status(404).json({ message: 'Characters not found.' })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: 'Error retrieving characters.' })
        })
})

// make new character
router.post('/:id/characters', validBook, (req, res) => {
    req.body.book_id = req.params.id;
    if (!req.body.name) {
        res.status(400).json({ message: "Missing character name, a required field." })
    }
    Books.addCharacter(req.body) 
        .then((character) => {
            if (character) {
                res.status(201).json(character)
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: 'Error adding new character.' })
        })
})

// edit character
router.put('/:id/character/:cid', validBook, (req, res) => {
    Books.update(req.params.cid, req.body)
    .then((character) => {
        res.status(202).json('Updated: ', character.name)
    })
})

module.exports = router;
