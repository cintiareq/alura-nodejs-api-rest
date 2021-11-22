const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;

roteador.get('/', async(requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar();
    resposta.status(200);
    const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'));
    resposta.send(serializador.serializar(resultados));
});

roteador.post('/', async(requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        resposta.status(201);
        const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'));
        resposta.send(serializador.serializar(fornecedor));
    } catch (erro) {
        proximo(erro);
    }
});

roteador.get('/:idFornecedor', async(requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        resposta.status(200);
        const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'), [
            'emails',
            'dataCriacao',
            'dataAtualizacao',
            'versao'
        ]);
        resposta.send(serializador.serializar(fornecedor));
    } catch (erro) {
        proximo(erro);
    }
});

roteador.put('/:idFornecedor', async(requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id });
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        resposta.status(204);
        reposta.end();
    } catch (erro) {
        proximo(erro);
    }
});

roteador.delete('/:idFornecedor', async(requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        await fornecedor.remover();
        resposta.status(204);
        resposta.end();
    } catch (erro) {
        resposta.status(404);
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            }) <<
            << << < HEAD
        );
    }
});

module.exports = roteador; ===
=== =
)
}
})

module.exports = roteador >>>
    >>> > 35 fafe976c2033cdbda9e5cd73c3e1b0685d70e6