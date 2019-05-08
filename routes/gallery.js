'use strict';

const express = require('express');
const router = express.Router();
// const knex = require('../database/knex.js');

// redirect to gallery
router.route('/')
  .post((req, res) => {
    console.log('Posted to /gallery');
    return res.redirect('/');
  })

router.route('/new')
  .get((req, res) => {
    return res.render('templates/main/new');
  });

router.route('/:id')
  .put((req, res) => {
    console.log('Putted to /gallery/id');
    return res.redirect('/:id');
  })
  .delete((req, res) => {
    console.log('Deleted to /gallery/id');
  })
  .get((req, res) => {
    return res.render('templates/main/detail'); 
  });

router.route('/:id/edit')
  .get((req, res) => {
    return res.render('templates/main/edit');
  })

module.exports = router;