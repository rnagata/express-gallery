'use strict';

const express = require('express');
const router = express.Router();








router.get('/', (req, res) => {
    console.log('Get to /account');
    //console.log(req);
    return res.render('templates/account/login', {layout: 'account'});
  });





module.exports = router;
