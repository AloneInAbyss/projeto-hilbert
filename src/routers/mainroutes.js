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

  let dbID;
  try {
    dbID = mongoose.Types.ObjectId(id);
  } catch {
    return res.redirect('/inicio');
  }
  const challenges = await Challenge.findOne({ _id: dbID });

  if (challenges !== null) {
    if (challenges.owner.toString() !== user._id.toString()) {
      return res.redirect('/inicio');
    }

    const rewards = await Reward.findOne({ owner: dbID });

    let rwid;
    if (rewards !== null) {
      rwid = rewards._id;
    } else {
      return res.redirect('/inicio');
    }


    res.render('desafio', {
      name: user.username,
      desafio: {
        name: challenges.title,
        description: challenges.description,
        completed: challenges.completed,
        recompensa: rwid,
        id: challenges._id.toString()
      }
    });
  } else {
    res.redirect('/inicio');
  }

});

router.get('/recompensa', auth, async function(req, res) {

  if (!req.logged) {
    return res.redirect('/login');
  }

  let user = req.user;
  let id = req.query.id;

  let dbID;
  try {
    dbID = mongoose.Types.ObjectId(id);
  } catch {
    return res.redirect('/inicio');
  }

  const rewards = await Reward.findOne({ _id: dbID });

  if (rewards !== null) {
    
    
    const challenges = await Challenge.findOne({ _id: rewards.owner });
    
    if (challenges !== null) {

      if (challenges.owner.toString() !== user._id.toString() ||
        !challenges.completed) {
        return res.redirect('/inicio');
      }

      res.render('recompensa', {
        name: user.username,
        recompensa: {
          link: rewards.link
        },
        desafio: {
          id: challenges._id,
          name: challenges.title
        }
      });
    } else {
      res.redirect('/inicio');
    }
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