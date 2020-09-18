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
    // @TODO: returning from specified database... need books.id?
        .where('books.id', id);
}

function getCharacterbyId(id) {
    return db('characters')
        .where('characters.id', id);
}

function getCharacters(bookId) {
    return db('characters')
        .select('*')
        .where('characters.book_id', bookId);
}

function getRelationships(character_id) {
    return db('relationships')
        .select('relationships.relationship_type', 'characters.name')
        .join('characters', 'relationships.relatives_id', 'characters.id')
        .join('books', 'relationships.book_id', 'books.id')
        .where('relationships.character_id', character_id);
}

function addBook(book) {
    return db('books')
        .insert(book, 'id')
        .then(([id]) => getBooks());
}

function addCharacter(character) {
    return db('characters')
        .insert(character, 'id')
        // @TODO: RESTful to return all characters?
        .then(([id]) => getCharacters());
}

function updateCharacter(id, changes) {
    return db('characters')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? getCharacterbyId(id) : null));
}
