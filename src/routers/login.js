const express = require('express');
const User = require('../models/user');
const Challenge = require('../models/challenge');
const auth = require('../middleware/auth');
const router = new express.Router();

// Rotas
router.get("/login", auth, function(req, res) {

  if (req.logged) {
    res.redirect('/inicio');
  } else {
    res.render('login');
  }

});

router.get("/cadastro", auth, function(req, res) {

  if (req.logged) {
    res.redirect('/inicio');
  } else {
    res.render('cadastro');
  }

});

router.post('/logar', async (req, res) => {

  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();

    res.cookie('auth_token', token);
    res.redirect('/inicio');
  } catch (e) {
    res.render('login', {
      message: true,
      alertMessage: 'Nome de usuário ou senha incorretos'
    });
  }

});

router.post('/cadastrar', async (req, res) => {

  if (req.body['password-check'] !== req.body.password) {
    return res.render('cadastro', {
      message: true,
      alertMessage: 'As senhas diferem!'
    });
  }
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.cookie('auth_token', token);
    res.redirect('inicio');
  } catch (e) {
    return res.render('cadastro', {
      message: true,
      alertMessage: 'Nome de usuário ou senha inválidos'
    });
  }

});

router.get("/inicio", auth, async function(req, res) {

  if (!req.logged) {
    return res.redirect('/login');
  }

  let user = req.user;
  let admin = (user.isAdmin) ? true : false;
  const challenges = await Challenge.find({ owner: user._id });

  let emptyInProgress = true;
  let emptyCompleted = true;
  let content = [];

  if (challenges.length !== 0) {

    // Agrupa todos os desafios do usuário
    for (desafio of challenges) {
      content.push({
        title: desafio.title, 
        description: desafio.description, 
        completed: desafio.completed,
        id: desafio._id.toString()
      });
      if (desafio.completed) { emptyCompleted = false; }
      if (!desafio.completed) { emptyInProgress = false; }
    }

  } else {
    emptyInProgress = true;
    emptyCompleted = true;
  }

  res.render('pagina-inicial', {
    name: user.username,
    emptyInProgress: emptyInProgress,
    emptyCompleted: emptyCompleted,
    content: content,
    admin: admin
  });

});

router.get('/sair', auth, async (req, res) => {
  
  if (!req.logged) {
    return res.redirect('/login');
  }

  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    })
    await req.user.save();
    res.clearCookie('auth_token');
    
    res.render('login', {
      message: true,
      alertMessage: 'Desconectado com sucesso!'
    });
  } catch (e) {
    res.redirect('/inicio');
  }

});

module.exports = router;