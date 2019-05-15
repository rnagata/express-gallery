
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'defaultOne', password: '123'},
        {username: 'defaultTwo', password: '456'},
        {username: 'defaultThree', password: '789'}
      ]);
    });
};
