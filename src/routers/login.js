// Dependências
const express = require('express');
const router = new express.Router();
// Modelos
const User = require('../models/user');
// Middleware
const auth = require('../middleware/auth');

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