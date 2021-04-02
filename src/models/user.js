const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  username: {
    type: String,
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
    required: true
  }
});

module.exports = User;