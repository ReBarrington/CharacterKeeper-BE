const express = require('express');
const Books = require('./books-model.js');
const router = express.Router();

// @TODO: middleware to check for id (on only certain endpoints)  

// retrieve list of books
router.get('/', (req, res) => {
    Books.getBooks()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(err => {
            console.err(err)
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
            console.err(err);
            res.status(500).json({ message: 'Failed to post new book.' });
        });
});

// see one book by id
router.get('/:id', (req, res) => {
    // @TODO: check for parameter first
    Books.getBookById(req.params.id)
        .then((book) => {
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found.' });
            }
        })
        .catch(err => {
            console.err(err);
            res.status(500).json({ message: 'Error retrieving the book.' });
        });
});

// get characters
router.get('/:id/characters', (req, res) => {
    // @TODO: check that book id is valid / if book has no characters yet
    Books.getCharacters(req.params.id) 
        .then((characters) => {
            // @TODO: check if characters exist
            res.status(200).json(characters)
        })
        .catch(err => {
            console.err(err)
            res.status(500).json({ message: 'Error retrieving characters.' })
        })
})

// make new character
router.post('/:id/characters', (req, res) => {
    // @TODO: check req.body exists / has all required fields
    Books.addCharacter(req.body) 
        .then((character) => {
            res.status(201).json(character)
        })
        .catch(err => {
            console.err(err)
            res.status(500).json({ message: 'Error adding new character.' })
        })
})

// edit character
router.put('/:id/character/:cid', (req, res) => {
    Books.update(req.params.cid, req.body)
    .then((character) => {
        res.status(202).json('Updated: ', character.name)
    })
})

module.exports = router;
