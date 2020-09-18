const db = require('../db-config.js');

module.exports = {
    getBooks,
    getBookById,
    getCharacterbyId,
    getCharacters,
    getRelationships,
    addBook,
    addCharacter,
    updateCharacter,
}

function getBooks() {
    return db('books');
}

function getBookById(id) {
    return db('books')
        .where('id', id);
}

function getCharacterbyId(id) {
    return db('characters')
        .where('id', id);
}

function getCharacters(bookId) {
    return db('characters')
        .select('*')
        .where('book_id', bookId);
}

function getRelationships(character_id) {
    return db('relationships')
        .select('relationship_type', 'characters.name')
        .join('characters', 'relatives_id', 'characters.id')
        .join('books', 'book_id', 'books.id')
        .where('character_id', character_id);
}

function addBook(book) {
    return db('books')
        .insert(book, 'id')
        .then(([id]) => getBooks());
}

function addCharacter(character) {
    return db('characters')
        .insert(character, 'id')
}

function updateCharacter(id, changes) {
    return db('characters')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? getCharacterbyId(id) : null));
}

