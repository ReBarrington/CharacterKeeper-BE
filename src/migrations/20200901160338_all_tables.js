
exports.up = function(knex) {
    return (
        knex.schema
          .createTable('books', tbl => {
              tbl.increments('id').primary().unique();
              tbl.string('title').notNullable().unique();
              tbl.string('author').notNullable();
              tbl.string('description')
              tbl.boolean('completed').notNullable().defaultTo(0)
          })
          .createTable('relationships', tbl => {
              tbl
                  .string('book_id')
                  .references('id')
                  .inTable('books')
              tbl
                  .string('character_id')
                  .references('id')
                  .inTable('characters')
              tbl.string('relatives_id')
              tbl.string('relationship_type')
          })
          .createTable('characters', tbl => {
              tbl.increments('id').primary().unique();
              tbl.string('name').notNullable().unique();
              tbl
                  .string('book_id')
                  .notNullable()
                  .references('id')
                  .inTable('books');
              tbl.string('description')
              tbl
                  .string('relationships')
                  .references('relatives_id')
                  .inTable('relationships');
              tbl.boolean('alive').notNullable().defaultTo(1)
        })
    )
  };
  
  exports.down = function(knex) {
      return knex.schema
          .dropTableIfExists('books')
          .dropTableIfExists('relationships')
          .dropTableIfExists('characters')
  };