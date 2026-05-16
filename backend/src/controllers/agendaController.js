/**
 * Projeto PI Senac 2025 - v1   "backend" 
 * Autor: [Grupo 31]
 * Descrição: Agenda simples usando Express.js
 * Data: [11-11-2025]
 *//**
* Baseado no guia oficial: https://expressjs.com/pt-br/guide/routing.html
*/
/**
 * Controller de Agendamentos
 */

const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();


// =============================
// NOVO AGENDAMENTO
// =============================
exports.novoAgendamento = async (req, res) => {
    try {

        // Pega token do header
        const token = req.headers.authorization?.split(' ')[1];

        // Verifica se existe token
        if (!token) {
            return res.status(401).json({
                message: 'Token não fornecido.'
            });
        }

        // Decodifica token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ID do usuário logado
        const cliente_id = decoded.id;

        // Dados enviados pelo frontend
        const {
            data,
            hora,
            descricao
        } = req.body;
        const data_horario = `${data} ${hora}:00`;

        const titulo = descricao;

        // Validação simples
        if (!data || !hora || !descricao) {
            return res.status(400).json({
                message: 'Título e data são obrigatórios.'
            });
        }

        // INSERT no PostgreSQL
        const resultado = await pool.query(
            `
      INSERT INTO agenda
      (titulo, descricao, data_horario, cliente_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
            [
                titulo,
                descricao,
                data_horario,
                cliente_id
            ]
        );

        // Retorno sucesso
        return res.status(201).json({
            message: 'Agendamento criado com sucesso!',
            agendamento: resultado.rows[0]
        });

    } catch (error) {

        console.error('Erro ao criar agendamento:', error);

        return res.status(500).json({
            message: 'Erro ao criar agendamento.',
            error: error.message
        });
    }
};


// =============================
// LISTAR AGENDAMENTOS DO USUÁRIO
// =============================
exports.listarAgendamentos = async (req, res) => {
    try {

        // Token
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Token não fornecido.'
            });
        }

        // Decodifica JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Busca agendamentos do usuário
        const resultado = await pool.query(
            `
      SELECT *
      FROM agenda
      WHERE cliente_id = $1
      ORDER BY data_horario ASC
      `,
            [decoded.id]
        );

        return res.json(resultado.rows);

    } catch (error) {

        console.error('Erro ao listar agendamentos:', error);

        return res.status(500).json({
            message: 'Erro ao listar agendamentos.',
            error: error.message
        });
    }
};


// =============================
// LISTAR TODOS AGENDAMENTOS
// =============================
exports.listarTodos = async (req, res) => {
    try {

        const resultado = await pool.query(
            `
      SELECT *
      FROM agenda
      ORDER BY data_horario ASC
      `
        );

        return res.json(resultado.rows);

    } catch (error) {

        console.error('Erro ao listar todos agendamentos:', error);

        return res.status(500).json({
            message: 'Erro ao listar agendamentos.',
            error: error.message
        });
    }
};