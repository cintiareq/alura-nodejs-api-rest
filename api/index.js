const express = require('express');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
app.use(bodyParser.json());
const CampoInvalido = require('./erros/CampoInvalido');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const roteador = require('./rotas/fornecedores');
const SerializadorErro = require('./Serializador').SerializadorErro;

const formatosAceitos = require('./Serializador').formatosAceitos;
app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept');
    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json';
    }
    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
        resposta.status(406);
        resposta.end();
        return;
    }
    resposta.setHeader('Content-Type', formatoRequisitado);
    proximo();
});

app.use('/api/fornecedores', roteador);

app.listen(config.get('api.porta'), () => {
    console.log('Server started on port 3000');
});

app.use((erro, requisicao, resposta, proximo) => {
    let status = 500;
    if (erro instanceof NaoEncontrado) {
        status = 404;
    }
    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400;
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406;
    }

    const serializador = new SerializadorErro(resposta.getHeader('Content-Type'));
    resposta.status(status);
    resposta.send(
        Serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    );
});