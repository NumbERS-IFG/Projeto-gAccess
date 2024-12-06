const Condicao = require("../models/condicao");

class CondicaoController {
    //LISTA TODOS OS ELEMENTOS
    async index(req, res) {
        try {
            let condicoes = await Condicao.findAll();
            return res.status(200).json(condicoes);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível consultar condições.", detalhes: error});
        }
    }

    //LISTA DE ACORDO COM ID
    async show(req, res) {
        try {
            let condicao = await Condicao.findById(req.params.id);
            return res.status(200).json(condicao);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível encontrar a condição.", detalhes: error});
        }
    }

    //INSERE ELEMENTOS
    async store(req, res) {
        const { condicao } = req.body;
        if (!condicao)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."});

        try {
            let id = await Condicao.save(condicao);
            res.status(201).json({mensagem: "Condição inserida com sucesso!", "id": id});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao inserir condição.", detalhes: error});
        }
    }

    //ATUALIZA ELEMENTOS
    async update(req, res) {
        const { condicao } = req.body;
        if (!condicao)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."});
        const id = req.params.id;

        try {
            await Condicao.update(condicao, id);
            res.status(201).json({mensagem: "Condição atualizada com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao atualizar condição.", detalhes: error});
        }
    }

    //ELIMINA ELEMENTOS
    async delete(req, res) {
        try {
            await Condicao.delete(req.params.id);
            res.status(200).json({mensagem: "Condição excluída com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao excluir condição", detalhes: error});
        }
    }
}

module.exports = CondicaoController;
