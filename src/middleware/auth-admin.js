const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authAdmin = async (req, res, next) => {
  try {
    // Para testes com o Insomnia
    //const token = req.header('Authorization').replace('Bearer ', '');

    // Para testes com o navegador
    // const token = req.cookies['auth_token'];

    const token = req.cookies['auth_token'];
    const decoded = jwt.verify(token, 'projetohilbert');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token, isAdmin: true });

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

module.exports = authAdmin;