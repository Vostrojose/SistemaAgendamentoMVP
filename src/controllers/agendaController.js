/**
 * Projeto PI Senac 2025 - v1   "backend" 
 * Autor: [Grupo 31]
 * Descrição: Agenda simples usando Express.js
 * Data: [11-11-2025]
 *//**
 * Baseado no guia oficial: https://expressjs.com/pt-br/guide/routing.html
 */

const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

//Cadastrar novo agendamento
exports.novoAgendamento = async (req,res) =>{
    try{
        // Pega o token do header
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token não fornecido." });
        }
        // Decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;  // ← ID do usuário logado

        // Dados do agendamento vindo do front
        const { data, hora, descricao } = req.body;

        // Cria o objeto final (com ID incluído)
        const novoAgendamento = {
            data,
            hora,
            descricao,
            user_id: userId  // ← INSERIDO AQUI!
        };
        return res.status(201).json({
            message: "Agendamento criado!",
            dados: novoAgendamento
        });
    }
     catch (err) {
            return res.status(401).json({ message: "Token inválido." });
    }
}

