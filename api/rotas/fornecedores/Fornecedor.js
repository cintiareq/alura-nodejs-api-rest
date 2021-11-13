const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
    constructor({
        id,
        empresa,
        emails,
        categoria,
        dataCriacao,
        dataAtualizacao,
        versao,
    }) {
        this.id = id;
        this.empresa = empresa;
        this.emails = emails
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async criar() {
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            emails: this.emails,
            categoria: this.categoria,
        });
        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    async carregar() {
        const fornecedorEncontrado = await TabelaFornecedor.buscarPorId(this.id);
        this.empresa = fornecedorEncontrado.empresa;
        this.emails = fornecedorEncontrado.emails;
        this.categoria = fornecedorEncontrado.categoria;
        this.dataCriacao = fornecedorEncontrado.dataCriacao;
        this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao;
        this.versao = fornecedorEncontrado.versao;
    }
}

module.exports = Fornecedor