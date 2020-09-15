
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('relationships').del()
    .then(function () {
      // Inserts seed entries
      return knex('relationships').insert([
        {book_id: '3', character_id: '1', relatives_id: '2', relationship_type: 'love interest'},
        {book_id: '3', character_id: '1', relatives_id: '3', relationship_type: 'love interest/brother-in-law'},
        {book_id: '3', character_id: '2', relatives_id: '3', relationship_type: 'frenemy'}
      ]);
    });
};
