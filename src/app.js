// Dependências
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");

// Banco de dados
require('./db/mongoose');

// Rotas
const loginRouter = require('./routers/login');
const challengesRouter = require('./routers/challenges');
const mainRouter = require('./routers/mainroutes');

// Variáveis
const app = express();
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use(loginRouter);
app.use(challengesRouter);
app.use(mainRouter);

// Inicia o servidor
app.listen(porta, () => {
  console.log(`Executando na porta ${porta}.`);
});