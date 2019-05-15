'use strict';
const User = require('../database/models/User')
const Gallery = require('../database/models/Gallery');

const express = require('express');
const router = express.Router();

router.route('/')
  .post((req, res) => {
    console.log(req.body);
    new Gallery({
      user_id: 1,
      link: req.body.link,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description
    }).save()
    .then((result) => {
      return res.redirect('/');
    });
  })

router.route('/new')
  .get((req, res) => {
    return res.render('templates/gallery/new', {layout: 'detail.hbs'});
  });

router.route('/:id')
  .put((req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    new Gallery({id : parseInt(req.params.id)}) //return
    .save({
      author: req.body.author,
      title: req.body.title,
      link: req.body.link,
      description: req.body.description 
    })
    .then((data) => {
      return res.redirect('/');
    });
  })
  .delete((req, res) => {
    new Gallery({id: req.params.id})
    .destroy()
    .then((model) => {
      res.redirect('/');
    });
  })
  .get((req, res) => {
    let queryOne = new Gallery({'id' : req.params.id}) //return
    .fetch({withRelated: ['user']})
    .then((data) => {
      return data;
    });

    let queryTwo = new Gallery({'id' : 1})
    .fetch({withRelated: ['user']})
    .then((data) => {
      return data;
    });

    let queryThree = new Gallery({'id' : 2})
    .fetch({withRelated: ['user']})
    .then((data) => {
      return data;
    });

    let queryFour = new Gallery({'id' : 3})
    .fetch({withRelated: ['user']})
    .then((data) => {
      return data;
    });

    let links = new Gallery()
    .where('id', '<>', req.params.id)
    .query((qb) => {
      qb.limit(3);
    }).fetchAll({withRelated: ['user']})
    .then((data) => {
      console.log(data.toJSON());
      return data.toJSON();
    });
    

    Promise.all([queryOne, links]).then((values) => {
      let context = {
        layout: 'detail.hbs',
        data: values[0],
        gallery: values[1]
      }
      return res.render('templates/gallery/detail', context);
    });
  });

router.route('/:id/edit')
  .get((req, res) => {
    new Gallery({'id' : req.params.id}) //return
    .fetch({withRelated: ['user']})
    .then((data) => {
      return res.render('templates/gallery/edit', {layout: 'detail.hbs', data: data});
    });
  })

module.exports = router;