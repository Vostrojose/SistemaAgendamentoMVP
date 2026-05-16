/**
 * Projeto PI Senac 2025 - v1 "back-end"
 * Autor: [grupo 31]
 * Descrição: Rotas da agenda
 * Data: [17-11-2025]
 */
/**
 * Baseado no guia oficial: https://expressjs.com/pt-br/guide/routing.html
 */
/**
 * Rotas de Agendamentos
 */

const express = require('express');

const router = express.Router();

const agendaController = require('../controllers/agendaController');


// =============================
// LISTAR AGENDAMENTOS DO USUÁRIO
// =============================
router.get(
  '/meus',
  agendaController.listarAgendamentos
);


// =============================
// LISTAR TODOS AGENDAMENTOS
// =============================
router.get(
  '/',
  agendaController.listarTodos
);


// =============================
// NOVO AGENDAMENTO
// =============================
router.post(
  '/agendar',
  agendaController.novoAgendamento
);


// =============================
// EXPORTAÇÃO
// =============================
module.exports = router;