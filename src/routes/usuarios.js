/**
 * Projeto PI Senac 2025 - v1 "back-end"
 * Autor: [grupo 31]
 * Descrição: Rotas de usuário (login/registro)
 * Data: [17-11-2025]
 */
/**
 * Rotas de usuários usando Express.js
 * Baseado no guia oficial: https://expressjs.com/pt-br/guide/routing.html
 */


const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/registrar', usuariosController.registrarUsuario);

router.post('/login', usuariosController.loginUsuario);

router.get('/perfil', usuariosController.obterPerfilUsuario);

router.get('/retornaUsuarios', usuariosController.retornaUsuarios);

router.put('/editar', usuariosController.editarUsuario);

module.exports = router;
