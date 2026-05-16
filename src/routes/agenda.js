/**
 * Projeto PI Senac 2025 - v1 "back-end"
 * Autor: [grupo 31]
 * Descrição: Rotas da agenda
 * Data: [17-11-2025]
 */
/**
 * Baseado no guia oficial: https://expressjs.com/pt-br/guide/routing.html
 */

const express = require('express');
const router = express.Router(); // Cria um rote
const pool = require('../config/db');
const agendaController = require('../controllers/agendaController');

//Rota GET para lista de agendamentos do usuário
router.get('/meus', function (req, res) {
  // TODO: Implementar autenticação e buscar agendamentos do usuário no banco
  const agendamentos = [
    {
      id: 1,
      data: '2025-11-20',
      hora: '10:30',
      descricao: 'Consulta médica'
    }
  ];
  res.json(agendamentos);
});

//Rota GET para lista de todos os agendamentos
router.get('/', function (req, res) {
  res.json({ message: 'Lista de agendamentos!' });
});

// Rota POST novo agendamento
router.post('/agendar', agendaController.novoAgendamento);




// Rota PUT para atualizar agendamento 
router.put('/:id', function (req, res) {
  const id = req.params.id;

  // Simula 
  res.json({ message: `Agendamento ${id} atualizado!` });
});

//  Rota DELETE
router.delete('/:id', function (req, res) {
  const id = req.params.id;

  // Simu exclusão
  res.json({ message: `Agendamento ${id} removido!` });
});

// Exporta todas as rotas para serem usadas no principal
module.exports = router;