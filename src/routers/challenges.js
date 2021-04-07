// Dependências
const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
// Modelos
const Challenge = require('../models/challenge');
const Reward = require('../models/reward');
// Middleware
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth-admin');

// Rotas
router.get('/desafio/cancelar', auth, async function (req, res) {

  if (!req.logged) {
    return res.redirect('/login');
  }

  let user = req.user;
  let admin = (user.isAdmin) ? true : false;
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
      },
      admin
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
  let admin = (user.isAdmin) ? true : false;
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
      },
      admin
    });
  } else {
    res.redirect('/inicio');
  }

});

router.post('/admin/desafios/criar', authAdmin, async (req, res) => {
  
  if (!req.logged) {
    return res.redirect('/login');
  }
  
  let challenge = new Challenge({
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner
  });

  
  /*try {
    let reward = Reward.findOne({ _id: req.body.rewardowner });
    if (reward !== null) {
      reward.owner = challenge._id;
      console.log(challenge._id);
      await reward.save();
    }
  } catch (e) {
    console.log("Erro na reward");
    res.redirect('/admin');
  }*/
  try {
    await challenge.save();
    res.redirect('/admin');
  } catch (e) {
    res.redirect('/admin');
  }
  
});

router.post('/admin/desafios/alterar', authAdmin, async (req, res) => {

  if (!req.logged) {
    return res.redirect('/login');
  }


  let challengeid = req.body.id;
  let challengetitle = req.body.title;
  let challengedescription = req.body.description;
  let challengeowner = req.body.owner;

  var challenges = await Challenge.findOne({ _id: challengeid });

  if (challenges !== null) {
    challenges.title = challengetitle;
    challenges.description = challengedescription;
    challenges.owner = challengeowner;
    try {
      await challenges.save();
      res.redirect('/admin');
    } catch {
      res.redirect('/admin');
    }
  } else {
    res.redirect('/admin');
  }

});

module.exports = router;