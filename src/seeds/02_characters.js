
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('characters').del()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([
        {name: 'Elizabeth Bennet', book_id: 3, description: 'The novel’s protagonist. The second daughter of Mr. Bennet, Elizabeth is the most intelligent and sensible of the five Bennet sisters. She is well read and quick-witted, with a tongue that occasionally proves too sharp for her own good. Her realization of Darcy’s essential goodness eventually triumphs over her initial prejudice against him.', relationships: [2, 3]},
        {name: 'Fitzwilliam Darcy', book_id: 3, description: 'A wealthy gentleman, the master of Pemberley, and the nephew of Lady Catherine de Bourgh. Though Darcy is intelligent and honest, his excess of pride causes him to look down on his social inferiors. Over the course of the novel, he tempers his class-consciousness and learns to admire and love Elizabeth for her strong character.', relationships: [1, 3]},
        {name: "George Wickham", book_id: 3, description: 'A handsome, fortune-hunting militia officer. Wickham’s good looks and charm attract Elizabeth initially, but Darcy’s revelation about Wickham’s disreputable past clues her in to his true nature and simultaneously draws her closer to Darcy.', relationships: [1, 2]}
      ]);
    });
};
