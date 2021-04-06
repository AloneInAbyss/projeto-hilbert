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
      challengecontent.push({
        title: desafio.title,
        description: desafio.description,
        completed: desafio.completed,
        owner: desafio.owner,
        id: desafio._id.toString()
      });
    }

  }

  if (rewards.length !== 0) {

    for (recompensa of rewards) {
      rewardcontent.push({
        link: recompensa.link,
        owner: recompensa.owner,
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
          admin: users[0].isAdmin
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
    
    if (req.body.action === 'Registrar') {
      try {
        users = await User.find();
      } catch {
        return res.redirect('/admin');
      }

      res.render('admin/desafios/desafio-novo', {
        name: user.username,
        users,
        admin: users[0].isAdmin
      });
    }/* else if (req.body.action === 'Editar') {
      try {
        challenges = await Challenge.find({ _id: req.body.challenge });
      } catch(e) {
        return res.redirect('/admin');
      }

      //const user = await User.findOneAndDelete({ _id: req.body.user });
      //return res.redirect('/admin');
    } else {res.send('nao')}*/
    
    
    if (challenges.length !== 0) {
      
    } else {
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