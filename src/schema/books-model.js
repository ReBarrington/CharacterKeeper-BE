const db = require('../db-config.js');
const mappers = require('./mappers.js')

module.exports = {
    getBooks,
    getBookById,
    getCharacterbyId,
    getCharacters,
    getRelationships,
    addBook,
    addCharacter,
    update
}

function getBooks() {
    return db('books')
}

function getBookById(id) {
    return db('books')
        // .join('Characters', 'characters.book_id', 'books.id')
        .where('books.id', id)
        // .then(characters => characters.map(character => mappers.charactersToBook(character)))
}

function getCharacterbyId(id) {
    return db('characters')
        // .join('Characters', 'characters.book_id', 'books.id')
        .where('characters.id', id)
        // .then(characters => characters.map(character => mappers.charactersToBook(character)))
}

// SELECT characters.name as Name, characters.description, characters.alive as Alive
// FROM characters
// where characters.book_id = 3

function getCharacters(bookId) {
    return db('characters')
        .select('*' )
        .where('characters.book_id', bookId)
}

// SELECT characters.name, relationships.relationship_type, characters.description
// FROM relationships
// join characters on relationships.relatives_id = characters.id 
// join books on relationships.book_id = books.id
// where relationships.character_id = 1

function getRelationships(character_id) {
    return db('relationships')
        .select('relationships.relationship_type', 'characters.name')
        .join('Characters', 'relationships.relatives_id', 'characters.id')
        .join('books', 'relationships.book_id', 'books.id')
        .where('relationships.character_id', character_id)
        // .then(relationships => relationships.map(relation => mappers.relationshipsToCharacter(relation)))
}

function addBook(book) {
    return db('books')
        .insert(book, 'id')
        .then(([id]) => getBooks())
}

function addCharacter(character) {
    return db('characters')
        .insert(character, 'id')
        .then(([id]) => getCharacters())
}

function update(id, changes) {
    return db('characters')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? getCharacterbyId(id) : null));
}
