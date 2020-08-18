// Servidor
const express = require('express');
const server = express();

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages');

// Configurar nunjucks (template engine)
const nunjucks = require('nunjucks');


nunjucks.configure('src/views', {
    express: server,
    noCache: true
});


// Início e configuração do servidor
server

// Receber os dados do request.body
.use(express.urlencoded({ extended: true }))

// Configurar arquivos estáticos (css, imagens, scripts)
.use(express.static("public"))

// Rotas da apicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

// Porta do servidor
.listen(5500);