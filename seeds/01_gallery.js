
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        {user_id: 1, link: 'http://tophdimgs.com/data_images/wallpapers/34/442323-shambhala.jpg', title: 'Shambala', author: 'Naughty Dog', description: 'A view of ruins overtaken by nature featuring a fallen statue and abnormal trees.'},
        {user_id: 2, link: 'https://i.redd.it/ivtc9348ne501.jpg', title: 'Irithyll of the Boreal Valley', author: 'From Software / nojuan87', description: 'A mythical city full of mystery'},
        {user_id: 3, link: 'https://www.stripes.com/polopoly_fs/1.297220.1407436475!/image/image.jpg_gen/derivatives/landscape_900/image.jpg', title: 'Salt Lake City', author: 'Naughty Dog', description: 'If America suffered a zombie apocalypse.'}
      ]);
    });
};
