/**
 * Projeto PI Senac 2025 - v1 "backend"
 * Autor: [grupo 31]
 * Descrição: Conexão e criação de tabelas
 * Data: [17-11-2025]
 */

const { Pool } = require('pg');
require('dotenv').config();

// Configuração da conexão com PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false } // Render exige SSL com essa opção
    : false // Em ambiente local, SSL pode ser desativado
});

const tableDefinitions = [
  {
    name: 'usuarios',
    createStatement: `CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      tipo TEXT DEFAULT 'usuario',
      criado_em TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    )`
  },
  {
    name: 'agenda',
    createStatement: `CREATE TABLE IF NOT EXISTS agenda (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data_horario TIMESTAMP WITHOUT TIME ZONE NOT NULL,
      cliente_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
      criado_em TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    )`
  }
];

async function ensureTables() {
  for (const table of tableDefinitions) {
    await pool.query(table.createStatement);
    console.log(`Tabela '${table.name}' verificada/criada.`);
  }
  
  // Adicionar coluna 'tipo' se não existir
  try {
    await pool.query(`
      ALTER TABLE usuarios 
      ADD COLUMN tipo TEXT DEFAULT 'usuario'
    `);
    console.log("Coluna 'tipo' adicionada à tabela usuarios.");
  } catch (err) {
    if (err.code === '42701') {
      // Coluna já existe, ignorar erro
      console.log("Coluna 'tipo' já existe em usuarios.");
    } else {
      console.error("Erro ao adicionar coluna 'tipo':", err.message);
    }
  }
}

// Teste de conexão (opcional, mas útil para logs)
pool.connect()
  .then(() => console.log(' Conectado ao PostgreSQL com sucesso!'))
  .catch(err => console.error(' Erro ao conectar ao banco:', err));

pool.ensureTables = ensureTables;

module.exports = pool;