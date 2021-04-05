const express = require('express');
const mongoose = require('mongoose');
const Challenge = require('../models/challenge');
const Reward = require('../models/reward');
const auth = require('../middleware/auth');
const router = new express.Router();

// Rotas
router.get('/desafio/cancelar', auth, async function (req, res) {

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

  var challenges = await Challenge.findOne({ _id: dbID });

  if (challenges !== null) {
    if (challenges.owner.toString() !== user._id.toString()) {
      return res.redirect('/inicio');
    }

    if (challenges.completed) {
      challenges.completed = false;
      try {
        await challenges.save();
      } catch {
        res.redirect('/inicio');
      }
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

router.get('/desafio/concluir', auth, async function (req, res) {

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
  
  var challenges = await Challenge.findOne({ _id: dbID });

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

    if (!challenges.completed) {
      challenges.completed = true;
      try {
        await challenges.save();
      } catch {
        res.redirect('/inicio');
      }
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

// router.post('/novodesafio', auth, async (req, res) => {
//   const challenge = new Challenge({
//       ...req.body,
//       owner: req.user._id
//   });

//   try {
//       await challenge.save();
//       res.status(201).send(challenge);
//   } catch (e) {
//       res.status(400).send(e);
//   }
// });

module.exports = router;