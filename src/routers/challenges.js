const express = require('express');
const Challenge = require('../models/challenge');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/novodesafio', auth, async (req, res) => {
  const challenge = new Challenge({
      ...req.body,
      owner: req.user._id
  });

  try {
      await challenge.save();
      res.status(201).send(challenge);
  } catch (e) {
      res.status(400).send(e);
  }
});

module.exports = router;