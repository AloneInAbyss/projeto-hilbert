// Dependências
const express = require('express');
const router = new express.Router();
// Modelos
const User = require('../models/user');
const Challenge = require('../models/challenge');
// Middleware
const auth = require('../middleware/auth');
const { Router } = require('express');
const Reward = require('../models/reward');

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
    
    let challenge, reward;
    
    // Desafio 1
    challenge = new Challenge({
      title: 'O Hotel Infinito',
      description: 'O Hotel Infinito é um experimento mental criado por David Hilbert, um matemático alemão, sobre um hotel com um infinito número de quartos. Se parece fácil para você, está errado. E se todos os quartos estiverem cheios e uma pessoa quiser entrar? E se forem 40 pessoas? Ou um ônibus com um infinito número de pessoas?',
      owner: user._id
    });
    await challenge.save();
  
    reward = new Reward({
      link: 'https://www.youtube.com/embed/Uj3_KqkI9Zo?cc_lang_pref=pt&amp;cc=1',
      owner: challenge._id
    });
    await reward.save();
    
    // Desafio 2
    challenge = new Challenge({
      title: 'O Paradoxo do Portal',
      description: 'No game Portal se um cubo passar por um portal em movimento irá sair do outro lado sem velocidade ou será disparado em alta velocidade? É uma questão de conservação do momento, relatividade de velocidades, buracos de minhoca, impressoras 3D e teletransporte quântico, falhas e muito mais.',
      owner: user._id
    });
    await challenge.save();
    
    reward = new Reward({
      link: 'https://www.youtube.com/embed/6sK3NzUKfyQ',
      owner: challenge._id
    });
    await reward.save();
    
    // Desafio 3
    challenge = new Challenge({
      title: 'Múltiplos de 3 e 5',
      description: 'Se listarmos todos os números naturais menores que 10 que são múltiplos de 3 ou de 5, teremos 3, 5, 6 e 9. A soma desses múltiplos é 23. Encontre a soma de todos os números múltiplos de 3 ou de 5 menores que 1000.',
      owner: user._id
    });
    await challenge.save();
    
    reward = new Reward({
      link: 'https://www.youtube.com/embed/lpN5ZL2oDwc',
      owner: challenge._id
    });
    await reward.save();

    // Desafio 4
    challenge = new Challenge({
      title: 'Bem-vindo ao Projeto Hilbert!',
      description: 'Veja aqui algumas dicas. Na página inicial há alguns desafios com temas interessantes, e ao marcá-los como concluídos haverá um vídeo sobre o assunto. Não é necessário inserir uma resposta, basta marcar como concluído. As recompensas levam a algum vídeo do YouTube. Se um usuário tiver a permissão de administrador (experimente fazer login com o nome de usuário "admin" e a senha "admin") há um link no topo das páginas para a área administrativa, onde é possível gerenciar usuários, desafios e recompensas.',
      owner: user._id,
      completed: true
    });
    await challenge.save();
    
    res.redirect('/inicio');
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