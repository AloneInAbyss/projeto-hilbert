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

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/public/login.html"));
});

app.get("/cadastro", function(req, res) {
  res.sendFile(__dirname + "/src/public/cadastro.html");
});

app.post("/logar", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/public/pagina-inicial.html"));
});

app.post("/cadastrar", function(req, res) {
  res.sendFile(__dirname + "/src/public/login.html");
});

app.get("/inicio", function(req, res) {
  res.sendFile(__dirname + "/src/public/pagina-inicial.html");
});

app.use(express.static(__dirname + '/src/public'));