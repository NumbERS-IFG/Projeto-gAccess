const Atividade = require("../models/atividade");

class AtividadeController {
    //LISTA TODOS OS ELEMENTOS
    async index(req, res) {
        try {
            let atividades = await Atividade.findAll();
            return res.status(200).json(atividades);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível consultar atividades.", detalhes: error});
        }
    }

    //LISTA DE ACORDO COM ID
    async show(req, res) {
        try {
            let atividade = await Atividade.findById(req.params.id);
            return res.status(200).json(atividade);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível encontrar a atividade.", detalhes: error});
        }
    }

    //INSERE ELEMENTOS
    async store(req, res) {
        const { nome, descricao = null } = req.body;
        if (!nome)
            return res.status(400).json({mensagem: "O campo 'Nome' é obrigatório."});

        try {
            const atividade = new Atividade({nome, descricao});
            let id = await Atividade.save(atividade);
            res.status(201).json({mensagem: "Atividade inserida com sucesso!", "id": id});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao inserir atividade.", detalhes: error});
        }
    }

    //ATUALIZA ELEMENTOS
    async update(req, res) {
        const { nome, descricao = null } = req.body;
        if (!nome)
            return res.status(400).json({mensagem: "Os campos 'Id' e 'Nome' são obrigatório."});
        const id = req.params.id;

        try {
            const atividade = new Atividade({id, nome, descricao});
            await Atividade.update(atividade);
            res.status(201).json({mensagem: "Atividade atualizada com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao atualizar atividade.", detalhes: error});
        }
    }

    //ELIMINA ELEMENTOS
    async delete(req, res) {
        try {
            await Atividade.delete(req.params.id);
            res.status(200).json({mensagem: "Atividade excluída com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao excluir atividade", detalhes: error});
        }
    }
}

module.exports = AtividadeController;
