// Dependências
const express = require("express");
const hbs = require("hbs");
const path = require("path");

// Variáveis
const app = express();
const porta = 3000;

// Paths
const publicFolderPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Configs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Diretório
app.use(express.static(publicFolderPath));

// Inicia o servidor
app.listen(porta, () => {
  console.log(`Executando na porta ${porta}.`);
});

// Rotas
app.get("/", function(req, res) {
  res.render('login');
});

app.get("/login", function(req, res) {
  res.render('login');
});

app.get("/cadastro", function(req, res) {
  res.render('cadastro');
});

app.post("/logar", function(req, res) {
  res.render('pagina-inicial');
});

app.post("/cadastrar", function(req, res) {
  res.render('login');
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

app.get('*', (req, res) => {
  res.render('login');
});