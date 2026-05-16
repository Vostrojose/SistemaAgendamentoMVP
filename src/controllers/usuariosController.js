/**
 * Projeto PI Senac 2025 - v1 "backend"
 * Autor: [grupo 31]
 * Descrição: Lógica de usuários (auth)
 * Data: [17-11-2025]
 */


const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

// Cadastrar novo usuário
exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const { rows: usuarioExistente } = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExistente.length > 0) {
      return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }

    await pool.query(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES ($1, $2, $3, $4)',
      [nome, email, senhaCriptografada, tipo || 'usuario']
    );

    res.status(201).json({ message: ' Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    const resposta = {
      message: 'Erro ao registrar usuário',
      error: error.code === '23505' ? 'Violação de unicidade no e-mail' : error.message
    };
    return res.status(error.code === '23505' ? 409 : 500).json(resposta);
  }
};

// Login
exports.loginUsuario = async (req, res) => {
  try {
  if (!req.body || !req.body.email || !req.body.senha) {
  return res.status(400).json({ message: 'Campos obrigatórios.' });
}

const { email, senha } = req.body;

    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuario = resultado.rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: '✅ Login realizado com sucesso!',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

  
exports.retornaUsuarios = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios');
    return res.json({
      message: resultado.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao retornar usuarios', error: error.message });
  }
}

exports.obterPerfilUsuario = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const resultado = await pool.query(
      'SELECT id, nome, email FROM usuarios WHERE id = $1',
      [decoded.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const usuario = resultado.rows[0];
    return res.json(usuario);

  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token inválido." });
    }
    console.error(err);
    return res.status(500).json({ message: "Erro interno." });
  }
};

exports.editarUsuario = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    await pool.query(
      'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3',
      [nome, email, decoded.id]
    );

    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token inválido." });
    }
    console.error('Erro ao editar usuário:', error);
    return res.status(500).json({ message: 'Erro ao editar usuário', error: error.message });
  }
};