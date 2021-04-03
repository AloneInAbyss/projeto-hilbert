const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 4,
    validate(value) {
      if(!validator.isAlphanumeric(value)) {
        throw new Error('Só pode conter caracteres alfanuméricos (letras e números)')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    validate(value) {
      if(!validator.isAlphanumeric(value)) {
        throw new Error('Só pode conter caracteres alfanuméricos (letras e números)')
      }
    }
    //,
    // validate(value) {
    //   if (!validator.isStrongPassword(value, { minLength: 6 })) {
    //     throw new Error('Precisa conter pelo menos um de cada caractere: letra maiúscula, minúscula, número e símbolo')
    //   } else if (value.includes(' ')) {
    //     throw new Error('Não pode conter espaços')
    //   }
    // }
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// Não envia a senha e os tokens ao solicitar a lista de usuários
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

// Gera um token de autenticação JWT
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'projetohilbert');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

// Verifica o nome de usuário e senha
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Falha ao logar');
  }

  // const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = (password === user.password);

  if (!isMatch) {
    throw new Error('Falha ao logar');
  }

  return user;
}

// Criptografa a senha antes de salvar
// userSchema.pre('save', async function (next) {
//   const user = this;

//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;