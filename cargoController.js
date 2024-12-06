const Cargo = require("../models/cargo");

class CargoController {
    //LISTA TODOS OS ELEMENTOS
    async index(req, res) {
        try {
            let cargos = await Cargo.findAll();
            return res.status(200).json(cargos);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível consultar cargos.", detalhes: error});
        }
    }

    //LISTA DE ACORDO COM ID
    async show(req, res) {
        try {
            let cargo = await Cargo.findById(req.params.id);
            return res.status(200).json(cargo);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível encontrar o cargo.", detalhes: error});
        }
    }

    //INSERE ELEMENTOS
    async store(req, res) {
        const { cargo, nivelAcesso } = req.body;
        if (!cargo || !nivelAcesso)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."});

        try {
            const cargoObj = new Cargo({cargo, nivelAcesso});
            let id = await Cargo.save(cargoObj);
            res.status(201).json({mensagem: "Cargo inserido com sucesso!", "id": id});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao inserir cargo.", detalhes: error});
        }
    }

    //ATUALIZA ELEMENTOS
    async update(req, res) {
        const { cargo, nivelAcesso } = req.body;
        if (!cargo || !nivelAcesso)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."});
        const id = req.params.id;

        try {
            const cargoObj = new Cargo({id, cargo, nivelAcesso});
            await Cargo.update(cargoObj);
            res.status(201).json({mensagem: "Cargo atualizado com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao atualizar cargo.", detalhes: error});
        }
    }

    //ELIMINA ELEMENTOS
    async delete(req, res) {
        try {
            await Cargo.delete(req.params.id);
            res.status(200).json({mensagem: "Cargo excluído com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao excluir cargo", detalhes: error});
        }
    }
}

module.exports = CargoController;
