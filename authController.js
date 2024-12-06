const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const permissoes = require('../routes/permissoes');

const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res){
        const { matricula, senha } = req.body;
        if (!matricula || !senha)
            return res.status(400).json({mensagem: "Os campos 'Matricula' e 'Senha' são obrigatórios."});

        const user = await Usuario.findByMatricula(matricula);
        if (!user)
            return res.status(400).json({mensagem: "Usuário não encontrado."});

        const samePassword = await bcrypt.compare(senha, user.senha);
        if (!samePassword)
            return res.status(400).json({mensagem: "Senha incorreta."});

        const token = jwt.sign({id: user.usuarioId /*isso aqui não tá retornando*/, matricula: user.matricula, nivelAcesso: user.nivel_acesso}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
        user.senha = undefined;
        res.status(200).json({ chaveAcesso: token, usuario: user });
    }

    authToken(req, res, next){
        const tokenHeader = req.headers['authorization'];
        const token = tokenHeader && tokenHeader.split(' ')[1];
        if(!token)
            return res.status(403).json({mensagem: "Não autorizado. Faça login."});

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err)
                return res.status(403).json({mensagem: "Não autorizado. Faça login."});
            req.user = decoded;
            next();
        })
    }

    authNivel(req, res, next){
        try {
            const tokenHeader = req.headers['authorization'];
            const token = tokenHeader && tokenHeader.split(' ')[1];

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const caminhoAtual = req.originalUrl.replace(/\/\d+$/, '/');
            const nivelRequerido = permissoes[caminhoAtual];

            if (nivelRequerido === undefined) {
                return res.status(403).json({ mensagem: "Permissão não configurada para esta rota." });
            }

            // Verifique se o nível de acesso do usuário é suficiente
            if (decoded.nivelAcesso < nivelRequerido) {
                return res.status(403).json({ mensagem: "Acesso negado" });
            }

            next();
        } catch (error) {
            return res.status(403).json({ mensagem: "Falha na autenticação", detalhes: error.message });
        }
    }
}

module.exports = AuthController;