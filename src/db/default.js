// Dependências
const mongoose = require('mongoose');
// Modelos
const User = require('../models/user');
const Challenge = require('../models/challenge');
const Reward = require('../models/reward');

try {
  async function findDefaultUser() {
    let user = await User.findOne({ 
      username: 'admin'
    });
    let useradmin = await User.findOne({ 
      username: 'admin',
      password: 'password',
      isAdmin: true
    });
    if (user !== null && useradmin === null) {
      await User.findOneAndDelete({ _id: user._id });
      const newUser = new User({
        username: 'admin',
        password: 'admin123',
        isAdmin: true
      });
      newUser.save();
    } else if (user === null) {
      const newUser = new User({
        username: 'admin',
        password: 'admin123',
        isAdmin: true
      });
      newUser.save();
    }
  }
  findDefaultUser();
} catch {
  console.log("Erro no banco de dados");
}