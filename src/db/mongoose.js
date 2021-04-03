const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/projeto-hilbert', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})