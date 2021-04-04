const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Rotas
router.get('/*', auth, function(req, res) {

  if (req.logged) {
    res.redirect('/inicio');
  } else {
    res.redirect('/login');
  }

});

module.exports = router;