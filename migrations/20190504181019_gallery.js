exports.up = function(knex, Promise) {
  return knex.schema.createTable('gallery', function(table){
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.text('link');
    table.string('title');
    table.string('author');
    table.text('description');
    table.timestamps(true, true);
  })
};
  
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gallery');
};

// id
// user_id / gallery owner
// author / photo source creator
// link / photo url
// description / description of photo content
// title / title of photo

// add a author column and title column to the Gallery table.