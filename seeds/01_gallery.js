
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        {user_id: 1, link: 'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F829044%252Ff1a11a98-59ed-46a9-a2df-bf2a6997ee31.jpg%252F950x534__filters%253Aquality%252890%2529.jpg?signature=RrPci3GH-I_L_lLLrMTuazG5jXc=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com', description: 'pretty'},
        {user_id: 2, link: 'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F829044%252Ff1a11a98-59ed-46a9-a2df-bf2a6997ee31.jpg%252F950x534__filters%253Aquality%252890%2529.jpg?signature=RrPci3GH-I_L_lLLrMTuazG5jXc=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com', description: 'beautiful'},
        {user_id: 3, link: 'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F829044%252Ff1a11a98-59ed-46a9-a2df-bf2a6997ee31.jpg%252F950x534__filters%253Aquality%252890%2529.jpg?signature=RrPci3GH-I_L_lLLrMTuazG5jXc=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com', description: 'amazing'}
      ]);
    });
};
