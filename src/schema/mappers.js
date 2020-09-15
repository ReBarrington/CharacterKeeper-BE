module.exports = {
    relationshipsToCharacter,
}

function relationshipsToCharacter(character, relation) {
    const result = {
        ...character,
        relationships: [...relation],
        mapping: 'TRUE'
    };

    return result;
}