const TabelaFornecedor = require('./TabelaFornecedor') <<
    << << < HEAD
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos') ===
    === =

    >>>
    >>> > 35 fafe976c2033cdbda9e5cd73c3e1b0685d70e6
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

    async criar() { <<
        << << < HEAD
        this.validar() ===
            === = >>>
            >>> > 35 fafe976c2033cdbda9e5cd73c3e1b0685d70e6
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
    async atualizar() {
        await TabelaFornecedor.buscarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}
        campos.forEach(campo => {
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })
        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }
        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    }

    remover() {
        return TabelaFornecedor.remover(this.id)

    }

    validar() {
        const campos = ['empresa', 'emails', 'categoria']
        campos.forEach(campo => {
            const valor = this[campo]
            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}






module.exports = Fornecedor