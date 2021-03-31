// Dependências
const express = require("express");
const path = require("path");

// Variáveis
const app = express();
const porta = 3000;
const publicFolderPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
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