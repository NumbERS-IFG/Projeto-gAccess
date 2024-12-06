const Categoria = require("../models/categoria");

class CategoriaController {
    //LISTA TODOS OS ELEMENTOS
    async index(req, res) {
        try {
            let categorias = await Categoria.findAll();
            return res.status(200).json(categorias);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível consultar categorias.", detalhes: error});
        }
    }

    //LISTA DE ACORDO COM ID
    async show(req, res) {
        try {
            let categoria = await Categoria.findById(req.params.id);
            return res.status(200).json(categoria);
        } catch (error) {
            res.status(404).json({mensagem: "Não foi possível encontrar a categoria.", detalhes: error});
        }
    }

    //INSERE ELEMENTOS
    async store(req, res) {
        const { categoria } = req.body;
        if (!categoria)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."});

        try {
            let id = await Categoria.save(categoria);
            res.status(201).json({mensagem: "Categoria inserida com sucesso!", "id": id});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao inserir categoria.", detalhes: error});
        }
    }

    //ATUALIZA ELEMENTOS
    async update(req, res) {
        const { categoria } = req.body;
        if (!categoria)
            return res.status(400).json({mensagem: "Todos os campos são obrigatórios."});
        const id = req.params.id;

        try {
            await Categoria.update(categoria, id);
            res.status(201).json({mensagem: "Categoria atualizada com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao atualizar categoria.", detalhes: error});
        }
    }

    //ELIMINA ELEMENTOS
    async delete(req, res) {
        try {
            await Categoria.delete(req.params.id);
            res.status(200).json({mensagem: "Categoria excluída com sucesso!"});
        } catch (error) {
            res.status(406).json({mensagem: "Erro ao excluir categoria", detalhes: error});
        }
    }
}

module.exports = CategoriaController;
