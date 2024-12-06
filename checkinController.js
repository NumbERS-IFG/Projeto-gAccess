const Checkins = require("../models/checkin");

class CheckinsController {
    //LISTA TODOS OS ELEMENTOS
    async index(req, res) {
        try {
            let checkins = await Checkins.findAll();
            return res.status(200).json(checkins);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível consultar checkin.", detalhes: error});
        }
    }

    //LISTA DE ACORDO COM ID
    async show(req, res) {
        try {
            let checkins = await Checkins.findById(req.params.id);
            return res.status(200).json(checkins);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível encontrar o checkin.", detalhes: error});
        }
    }

    //INSERE ELEMENTOS
    async store(req, res) {
        const { data, horario, usuarioId } = req.body;
        if (!data || !horario || !usuarioId)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."})

        try {
            const checkin = new Checkins({data, horario, usuarioId});
            let id = await Checkins.save(checkin);
            res.status(201).json({mensagem: "Checkin inserido com sucesso!", "id": id});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao inserir checkin.", detalhes: error});
        }
    }

    //ATUALIZA ELEMENTOS
    async update(req, res) {
        const { data, horario, usuarioId } = req.body;
        if (!data || !horario || !usuarioId)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."})
        const id = req.params.id;

        try {
            const checkin = new Checkins({id, data, horario, usuarioId});
            await Checkins.update(checkin);
            res.status(201).json({mensagem: "Checkin atualizado com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao atualizar checkin.", detalhes: error});
        }
    }

    //ELIMINA ELEMENTOS
    async delete(req, res) {
        try {
            await Checkins.delete(req.params.id);
            res.status(200).json({mensagem: "Checkin excluído com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao excluir checkin", detalhes: error});
        }
    }
}

module.exports = CheckinsController;
