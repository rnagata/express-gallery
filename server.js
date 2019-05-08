'use strict';

const express = require('express');
const session = require('express-session'); 
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const gallery = require('./routes/gallery.js');
// const account = require('./routes/account.js');
const User = require('./database/models/User');
const guard = require('./middleware/guard.js');

const app = express();
const port = 3000;
const saltRounds = 12;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cookieParser()); // why?
app.use(session({secret : 'keyboard cat'})); // why?
app.use(passport.session());

// app.engine('hbs', exphbs({defaultLayout: 'main.hbs', extname: '.hbs'}));
// app.set('view engine', 'hbs');
// app.use(bodyParser.json());

passport.use(
  // strategy is our method of verification
  new localStrategy((username, password, done) => {
    console.log('username ', username);
    console.log('password ', password);
    console.log('done ', done);
    console.log();
    // references our bookshelf User.js User model.
    return new User({username : username})
    // .fetch comes from the Fetch API and establishes a promise
    .fetch()
    .then((user) => {
      console.log('user after then ', user);
      if (!user) { // user === null
        return done(null, false, {message : 'bad username or password'});
      } else {
        // happy route
        user = user.toJSON();
        console.log('user after user.toJSON ', user);

        bcrypt.compare(password, user.password)
        .then((res) => {
          console.log('password 1, dont know where it\'s from ', password);
          console.log('password 2, maybe part of the user something ', user.password);
          console.log('res ', res);
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, {message : 'bad username or password'});
          }
        });
      }
    })
    .catch((err) => {
      console.log('err ', err);
      return done(err);
    });
  })
);

passport.serializeUser((user, done) => {
  console.log('user ', user);
  console.log('done ', done);
  return done(null, {id : user.id, username : user.username});
});

passport.deserializeUser((user, done) => {
  console.log('user ', user);
  console.log('done ', done);

  return new User({id : user.id})
  .fetch()
  .then((user) => {
    console.log('user.id ', user.id);
    console.log('user ', user);
    user = user.toJSON();
    done(null, {
      id: user.id,
      username: user.username,
    });
  });
});

app.get('/smoke', (req, res) => {
  console.log('in smoke route');
  console.log(req.isAuthenticated());
  // object will always be .user (reqardless of what object gets passed thru)
  console.log(req.user);
  if (req.isAuthenticated()) {
    return res.send(`Hello ${req.user.username}`);
  } else {
    return res.send("I don't know who you are.");
  }
});

app.get('/secret', guard, (req, res) => {
  return res.send('You found the secret');
});

app.use(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html',
    // failureFlash: true,
  }),
);

app.post('/register', (req, res) => {
  console.log('req ', req);
  console.log('res ', res);
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { console.log('err ', err); } //return 500

    // console.log(salt);

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) { console.log('err ', err); } //return 500

      console.log('password: ', hash);

      return new User({
        username: req.body.username,
        password: hash,
      })
      .save()
      .then((user) => {
        console.log(user);
        return res.redirect('/login.html');
      })
      .catch((err) => {
        console.log(err);
        return res.send('Error creating account');
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});



// app.use('/gallery', gallery);
// app.use('/account', account);

// app.get('/', (req, res) => {
  
//   new User()
//   .fetchAll({ withRelated: ['galleries']})
//   .then((result) => {
//     const models = result.models;
//     const userObject = models[0];
//     //const username = userObject.get('name');

//     const user = userObject.toJSON();
//     let context = {
//       name: user.name,
//       link: user.galleries[0].link
//     }
//     return res.render('templates/main/listing', context);
//   });
// });