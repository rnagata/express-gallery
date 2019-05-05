exports.up = function(knex, Promise) {
  return knex.schema.createTable('gallery', function(table){
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.text('link');
    table.text('description');
    table.timestamps(true, true);
  })
};
  
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gallery');
};