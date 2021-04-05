const express = require('express');
const Reward = require('../models/reward');
const auth = require('../middleware/auth');
const router = new express.Router();

// router.get('/novarecompensa', auth, async (req, res) => {

//   const reward = new Reward({
//     link: req.query.link,
//     owner: req.user._id
//   });

//   try {
//     await reward.save();
//     res.status(201).send(reward);
//   } catch (e) {
//     res.status(400).send(e);
//   }

// });

module.exports = router;