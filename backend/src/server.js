/**
 * Projeto PI Senac 2025 - v1 "backend"
 * Autor: [grupo 31]
 * Descrição: Servidor Express e rotas
 * Data: [17-11-2025]
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const dbPool = require('./config/db');

// Middlewares para interpretar JSON e dados de formulários HTML

app.use(cors({
  origin: 'https://sistema-agendamento-mvp.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Importação das rotas
const usuariosRoutes = require('./routes/usuarios');
const agendaRoutes = require('./routes/agenda');

// Rotas da aplicação
app.use('/usuarios', usuariosRoutes);
app.use('/agendamentos', agendaRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbPool.ensureTables();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o servidor:', error);
    process.exit(1);
  }
};

startServer();