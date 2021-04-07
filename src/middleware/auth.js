// Dependências
const jwt = require('jsonwebtoken');
// Modelos
const User = require('../models/user');

const auth = async (req, res, next) => {

  try {
    // Testes com o Insomnia
    //const token = req.header('Authorization').replace('Bearer ', '');

    // Cookie do navegador
    const token = req.cookies['auth_token'];

    const decoded = jwt.verify(token, 'projetohilbert');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error('Falha na autenticação');
    }

    req.token = token;
    req.user = user;
    req.logged = true;

    next();
  } catch (e) {
    req.logged = false;
    next();
  }
  
}

module.exports = auth;