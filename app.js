// Dependências
var express = require("express");
var path = require("path");

// Variáveis
var app = express();
var porta = 3000;


// Inicia o servidor
app.listen(porta, () => {
  console.log(`Executando na porta ${porta}.`);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/public/pages/login/index.html"));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/public/pages/login/index.html"));
});

app.get("/cadastro", function(req, res) {
  res.sendFile(__dirname + "/src/public/pages/cadastro/index.html");
});

app.post("/logar", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/public/pages/pagina-inicial/index.html"));
});

app.post("/cadastrar", function(req, res) {
  res.sendFile(__dirname + "/src/public/pages/login/index.html");
});

app.get("/inicio", function(req, res) {
  res.sendFile(__dirname + "/src/public/pages/pagina-inicial/index.html");
});

app.get("/desafio", function(req, res) {
  res.sendFile(__dirname + "/src/public/pages/desafio/index.html");
});

app.get("/recompensa", function(req, res) {
  res.sendFile(__dirname + "/src/public/pages/recompensa/index.html");
});

app.use(express.static(__dirname + '/src/public'));