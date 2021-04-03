const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

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

// router.post("/logar", async (req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;

//   if(!username || !password) {
//     return res.render('login', {
//       message: true,
//       alertMessage: 'Nome de usuário ou senha incorretos'
//     });
//   }

//   try {
//     const users = await User.find({ username: username, password: password });

//     if(users.length === 0) {
//       return res.render('login', {
//         message: true,
//         alertMessage: 'Nome de usuário ou senha incorretos'
//       });
//     }
//     return res.render('pagina-inicial', {
//       name: username,
//     });
//     // res.send(users);

//   } catch (e) {
//     res.status(500).send();
//   }

//   // if(username==='admin' && password==='admin') {
//   //   res.render('pagina-inicial', {
//   //     name: username
//   //   });
//   // } else {
//   //   res.render('login');
//   // }
// });

router.post('/logar', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.cookie('auth_token', token);
    //res.redirect('/inicio');  
    //res.send({ user, token });
    res.render('pagina-inicial', {
      name: req.body.username,
    });
    // res.send('Login concluído!')
  } catch (e) {
    //res.status(400).send('Nome de usuário ou senha incorretos');
    res.render('login', {
      message: true,
      alertMessage: 'Nome de usuário ou senha incorretos'
    });
  }
})

// router.post("/cadastrar", async (req, res) => {
//   if (req.body['password-check'] !== req.body.password) {
//     // return res.status(400).send('As senhas diferem!')
//     return res.render('cadastro', {
//       message: true,
//       alertMessage: 'As senhas diferem!'
//     });
//   }
//   const user = new User(req.body);

//   try {
//     await user.save();
//     res.status(201).send(user);
//   } catch (e) {
//     // res.status(400).send(e);
//     return res.render('cadastro', {
//       message: true,
//       alertMessage: 'Nome de usuário ou senha inválidos'
//     });
//   }

//   // res.render('login');
// });

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
    //res.status(201).send({ user, token });
    res.render('pagina-inicial', {
      name: req.body.username,
    });
  } catch (e) {
    // res.status(400).send(e);
    return res.render('cadastro', {
      message: true,
      alertMessage: 'Nome de usuário ou senha inválidos'
    });
  }
});

router.get("/inicio", auth, function(req, res) {
  res.render('pagina-inicial');
});

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

router.get('/sair', auth, async (req, res) => {
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
    res.status(500).send();
  }
});

router.get('/cookies', (req, res) => {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
 
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)

  res.send(Object.values(req.cookies) + ' ' + Object.values(req.signedCookies))
})

module.exports = router;