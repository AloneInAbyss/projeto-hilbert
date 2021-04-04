const mongoose = require('mongoose');
const Reward = require('./reward');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

// Referencia a recompensa do desafio
challengeSchema.virtual('rewards', {
  ref: 'Reward',
  localField: '_id',
  foreignField: 'owner'
});

// Apaga a recompensa quando o desafio for apagado
challengeSchema.pre('remove', async function (next) {
  const challenge = this;
  await Reward.deleteMany({ owner: challenge._id });
  next();
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;