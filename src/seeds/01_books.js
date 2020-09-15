
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title: 'A Tale of Two Cities', author: "Charles Dickens", description: 'Classic passionate and noble tale of London and Paris played out against the turbulent background of the French Revolution.', completed: false},
        {title: 'To Kill a Mockingbird', author: "Harper Lee", description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it', completed: false},
        {title: 'Pride and Prejudice', author: "Jane Austin", description: 'The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.', completed: true}
      ]);
    });
};
