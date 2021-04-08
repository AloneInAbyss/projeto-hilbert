// Dependências
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');

// Banco de dados
require('./db/mongoose');
require('./db/default');

// Rotas
const loginRouter = require('./routers/login');
const usersRouter = require('./routers/users');
const challengesRouter = require('./routers/challenges');
const rewardsRouter = require('./routers/rewards');
const mainRouter = require('./routers/main');

// Express
const app = express();
const port = process.env.PORT || 3000;

// Paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Configs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Use
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use(loginRouter);
app.use(usersRouter);
app.use(challengesRouter);
app.use(rewardsRouter);
app.use(mainRouter);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Executando na porta ${port}.`);
});