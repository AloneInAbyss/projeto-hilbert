// Dependências
const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
// Modelos
const User = require('../models/user');
// Middleware
const authAdmin = require('../middleware/auth-admin');

router.post('/admin/usuarios/criar', authAdmin, async function(req, res) {

  if (!req.logged) {
    return res.redirect('/login');
  }

  let userid = req.body.userid;
  let useradmin = req.body.isAdmin;

  var users = await User.findOne({ _id: userid });

  if (users !== null) {
    users.isAdmin = useradmin;
    try {
      await users.save();
      res.redirect('/admin');
    } catch {
      res.redirect('/admin');
    }
  } else {
    res.redirect('/admin');
  }

});

module.exports = router;