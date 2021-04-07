// Dependências
const express = require('express');
const router = new express.Router();
// Modelos
const Reward = require('../models/reward');
// Middleware
const authAdmin = require('../middleware/auth-admin');

router.post('/admin/recompensas/criar', authAdmin, async (req, res) => {
  
  if (!req.logged) {
    return res.redirect('/login');
  }
  
  let reward = new Reward({
    link: req.body.link,
    owner: req.body.owner
  });

  try {
    await reward.save();
    res.redirect('/admin');
  } catch (e) {
    res.redirect('/admin');
  }
  
});

router.post('/admin/recompensas/alterar', authAdmin, async (req, res) => {

  if (!req.logged) {
    return res.redirect('/login');
  }

  let rewardid = req.body.id;
  let rewardlink = req.body.link;
  let rewardowner = req.body.owner;

  var reward = await Reward.findOne({ _id: rewardid });

  if (reward !== null) {
    reward.link = rewardlink;
    reward.owner = rewardowner;
    try {
      await reward.save();
      res.redirect('/admin');
    } catch {
      res.redirect('/admin');
    }
  } else {
    res.redirect('/admin');
  }

});

module.exports = router;