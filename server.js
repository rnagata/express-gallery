const express = require('express');
const expressHbs = require('express-handlebars');
const User = require('./database/models/User');
const app = express();

app.get('/', (req, res) => {
  
  // new User({
  //   username: 'Bob'
  // })
  // .save()
  // .then(() => {  
  // })
  console.log('before new gallery');
  new User()
  .fetchAll({ withRelated: ['galleries']})
  .then((result) => {
    console.log(result);
    // result -> Bookshelf array object

    // result.models -> Array of Bookshelf User Objects
    const models = result.models;
    console.log(models);

    // Bookshelf User Object
    //const userObject = models[0];
    //console.log(userObject);

    // username attribute object from Bookshelf User Object
    //const username = userObject.get('name');
    //console.log(username);

    // simple  javascript user object
    // const user = userObject.toJSON();
    // console.log(user);
    // res.json(userObject);
    res.send('OK');
  })
});

app.listen(3000);




