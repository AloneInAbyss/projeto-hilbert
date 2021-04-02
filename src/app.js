// Dependências
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

// Banco de dados
require('./db/mongoose');

// Rotas
// const challengesRouter = require('./routers/challenges');
// const rewardsRouter = require('./routers/rewards');
// const usersChallengesRouter = require('./routers/userchallenges');
// const usersRouter = require('./routers/users');
const loginRouter = require('./routers/login');

// Variáveis
const porta = process.env.PORT || 3000;

// Paths
const publicFolderPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Configs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Use
app.use(express.static(publicFolderPath));
app.use(express.urlencoded({ extended: true }));
// app.use(challengesRouter);
// app.use(rewardsRouter);
// app.use(userChallengesRouter);
// app.use(usersRouter);
app.use(loginRouter);

// Inicia o servidor
app.listen(porta, () => {
  console.log(`Executando na porta ${porta}.`);
});

app.get("/inicio", function(req, res) {
  res.render('pagina-inicial');
});

app.get("/desafio", function(req, res) {
  res.render('desafio');
});

app.get("/recompensa", function(req, res) {
  res.render('recompensa');
});

app.get("/sair", function(req, res) {
  res.render('login');
});

app.get("/admin", function(req, res) {
  res.render('administrador');
});

app.get('*', (req, res) => {
  res.render('login');
});