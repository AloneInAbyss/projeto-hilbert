const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// Rotas
router.get("/", function(req, res) {
  res.render('login');
});

// router.get("/login", function(req, res) {
//   res.render('login');
// });

router.get("/cadastro", function(req, res) {
  res.render('cadastro');
});

router.post("/logar", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if(!username || !password) {
    return res.render('login', {
      message: true,
      alertMessage: 'Nome de usuário ou senha incorretos'
    });
  }

  try {
    const users = await User.find({ username: username, password: password });

    if(users.length === 0) {
      return res.render('login', {
        message: true,
        alertMessage: 'Nome de usuário ou senha incorretos'
      });
    }
    return res.render('pagina-inicial', {
      name: username,
    });
    // res.send(users);

  } catch (e) {
    res.status(500).send();
  }

  // if(username==='admin' && password==='admin') {
  //   res.render('pagina-inicial', {
  //     name: username
  //   });
  // } else {
  //   res.render('login');
  // }
});

router.post("/cadastrar", async (req, res) => {
  if (req.body['password-check'] !== req.body.password) {
    // return res.status(400).send('As senhas diferem!')
    return res.render('cadastro', {
      message: true,
      alertMessage: 'As senhas diferem!'
    });
  }
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    // res.status(400).send(e);
    return res.render('cadastro', {
      message: true,
      alertMessage: 'Nome de usuário ou senha inválidos'
    });
  }

  // res.render('login');
});

module.exports = router;