const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth-admin');
const User = require('../models/user');
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

router.get('/admin', authAdmin, async function(req, res) {
  
  if (!req.logged) {
    return res.redirect('/login');
  }

  let user = req.user;
  let admin = (user.isAdmin) ? true : false;

  const users = await User.find();
  const challenges = await Challenge.find();
  const rewards = await Reward.find();
  
  let usercontent = [];
  let challengecontent = [];
  let rewardcontent = [];

  if (users.length !== 0) {

    for (usuario of users) {
      usercontent.push({
        name: usuario.username,
        admin: usuario.isAdmin,
        id: usuario._id.toString()
      });
    }

  }

  if (challenges.length !== 0) {

    for (desafio of challenges) {
      let owner = await User.findOne({ _id: desafio.owner});

      challengecontent.push({
        title: desafio.title,
        description: desafio.description,
        completed: desafio.completed,
        owner: owner.username,
        id: desafio._id.toString()
      });
    }

  }

  if (rewards.length !== 0) {
    
    for (recompensa of rewards) {
      let owner = await Challenge.findOne({ _id: recompensa.owner});

      rewardcontent.push({
        link: recompensa.link,
        owner: owner.title,
        id: recompensa._id.toString()
      });
    }

  }

  res.render('admin/administrador', {
    name: user.username,
    usercontent,
    challengecontent,
    rewardcontent,
    admin: admin
  });

});

router.post('/admin', authAdmin, async function(req, res) {

  if (!req.logged) {
    return res.redirect('/login');
  }

  let users, challenges, rewards;
  let user = req.user;
  let admin = (user.isAdmin) ? true : false;

  // USUÁRIOS
  if (req.body.optype === "user") {
    try {
      users = await User.find({ _id: req.body.user });
    } catch(e) {
      return res.redirect('/admin');
    }
  
    if (users.length !== 0) {
      if (req.body.action === 'Registrar' || req.body.action === 'Editar') {
        res.render('admin/usuarios/usuario-novo', {
          name: user.username,
          user: users[0].username,
          userid: users[0].id,
          useradmin: users[0].isAdmin,
          admin
        });
      } else if (req.body.action === 'Deletar') {
        const user = await User.findOneAndDelete({ _id: req.body.user });
        return res.redirect('/admin');
      }
    } else {
      return res.redirect('/admin');
    }
  } 
  
  // DESAFIOS
  else if (req.body.optype === "challenge") {
    // Registrar
    if (req.body.action === 'Registrar') {
      try {
        users = await User.find();
        rewards = await Reward.find();
      } catch {
        return res.redirect('/admin');
      }

      res.render('admin/desafios/desafio-novo', {
        name: user.username,
        users,
        rewards,
        admin
      });
    } 
    // Editar
    else if (req.body.action === 'Editar') {
      try {
        users = await User.find();
      } catch {
        return res.redirect('/admin');
      }
      try {
        challenges = await Challenge.findOne({ _id: req.body.challenge });
        var userchallenge = await User.findOne({ _id: challenges.owner });
      } catch(e) {
        return res.redirect('/admin');
      }

      if (challenges.length !== 0) {
        res.render('admin/desafios/desafio-alterar', {
          name: user.username,
          users,
          challenges,
          userchallenge: userchallenge.username,
          admin
        });
      } else {
        return res.redirect('/admin');
      }
    } 
    // Deletar
    else if (req.body.action === 'Deletar') {
      const challenge = await Challenge.findOneAndDelete({ _id: req.body.challenge });
      return res.redirect('/admin');
    } 
    // Outro
    else {
      return res.redirect('/admin');
    }
    
  }
  // RECOMPENSAS
  else if (req.body.optype === "reward") {
    // Registrar
    if (req.body.action === 'Registrar') {

      try {
        challenges = await Challenge.find();
      } catch {
        return res.redirect('/admin');
      }

      res.render('admin/recompensas/recompensa-novo', {
        name: user.username,
        challenges,
        admin
      });
    }
    // Editar
    else if (req.body.action === 'Editar') {

      try {
        challenges = await Challenge.find();
      } catch {
        return res.redirect('/admin');
      }

      try {
        reward = await Reward.findOne({ _id: req.body.reward });
        var challengereward = await Challenge.findOne({ _id: reward.owner });
      } catch(e) {
        return res.redirect('/admin');
      }

      if (reward.length !== 0) {
        res.render('admin/recompensas/recompensa-alterar', {
          name: user.username,
          reward,
          challenges,
          challengereward: challengereward.title,
          admin
        });
      } else {
        return res.redirect('/admin');
      }
    } 
    // Deletar
    else if (req.body.action === 'Deletar') {
      const reward = await Reward.findOneAndDelete({ _id: req.body.reward });
      return res.redirect('/admin');
    } 
    // Outro
    else {
      return res.redirect('/admin');
    }
  }
  
  else {
    return res.redirect('/admin');
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