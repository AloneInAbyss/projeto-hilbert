const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Challenge = require('../models/challenge');
const Reward = require('../models/reward');
const router = new express.Router();

// Rotas
router.get('/desafio', auth, async function(req, res) {

  if (!req.logged) {
    return res.redirect('/login');
  }

  let user = req.user;
  let id = req.query.id;

  const dbID = mongoose.Types.ObjectId(id);
  const challenges = await Challenge.findOne({ _id: dbID });

  if (challenges !== null) {
    if (challenges.owner.toString() !== user._id.toString()) {
      return res.redirect('/inicio');
    }

    res.render('desafio', {
      name: user.username,
      desafio: {
        name: challenges.title,
        description: challenges.description,
        completed: challenges.completed,
        recompensa: '',
        id: challenges._id.toString()
      }
    });
  } else {
    res.redirect('/inicio');
  }

});

router.get('/*', auth, function(req, res) {

  if (req.logged) {
    res.redirect('/inicio');
  } else {
    res.redirect('/login');
  }

});

module.exports = router;