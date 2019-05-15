'use strict';

const express = require('express');
const session = require('express-session'); 
const expressHbs = require('express-handlebars');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('connect-redis')(session);

const User = require('./database/models/User');
const Gallery = require('./database/models/Gallery');
const guard = require('./middleware/guard.js');
const gallery = require('./routes/gallery.js');

const port = 3000;
const saltRounds = 12;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({  
  store: new redis({url: process.env.REDIS_URL}),
  secret: process.env.REDIS_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.engine('hbs', expressHbs({defaultLayout: 'main.hbs', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy((username, password, done) => {
    return new User({username : username}) 
    .fetch()
    .then((user) => {
      if (!user) {
        return done(null, false, {message : 'bad username or password'});
      } else {
        // happy route
        user = user.toJSON();
        bcrypt.compare(password, user.password)
        .then((res) => {
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
  return done(null, {id : user.id, username : user.username});
});

passport.deserializeUser((user, done) => {
  return new User({id : user.id})
  .fetch()
  .then((user) => {
    user = user.toJSON();
    done(null, {
      id: user.id,
      username: user.username,
    });
  });
});

app.get('/', function (req, res) {
  if (req.isAuthenticated()){
    return new Gallery()
    .fetchAll({withRelated: ['user']})
    .then((data) => {
      data = {featured: data.models[0], gallery: data.models};
      return res.render('index.hbs', data);
    });
  } else {
    return res.redirect('/login.html');
  }
});

app.get('/smoke', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(`Hello ${req.user.username}`);
  } else {
    return res.send("I don't know who you are.");
  }
});

app.get('/secret', guard, (req, res) => {
  return res.send('You found the secret');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html',
  }),
);

app.post('/register', (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { console.log('err ', err); } //return 500
      bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) { console.log('err ', err); } //return 500
      
      return new User({
        username: req.body.username,
        password: hash,
      })
      .save()
      .then((user) => {
        return res.redirect('/login.html');
      })
      .catch((err) => {
        return res.send('Error creating account');
      });
    });
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send('logged out');
});

app.use('/gallery', gallery);
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});