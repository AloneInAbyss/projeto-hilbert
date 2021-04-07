// Dependências
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Challenge'
  }
});

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;