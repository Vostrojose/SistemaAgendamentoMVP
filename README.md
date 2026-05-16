#  Projeto PI Senac 2025 - v1

**Data:** 20/11/2025  
**Descrição:** Sistema de cadastro, login e agendamento de serviços utilizando **Node.js**, **Express.js** e **PostgreSQL**.  

**Autores – Grupo 08:**  
- Beatriz Pigatto  
- Carlos Eduardo Brito de Oliveira  
- Danilo de Sousa Bailon  
- Gabriel Gomes Martins  
- Gabriel Santos do Carmo  
- Jose Maria da Silva  

---

## Objetivo
Prova de Conceito (PoC – Proof of Concept)v**sistema de agendamento online** que permita:
- Demonstração de rotas para funcionalidades em
- Cadastro e login de usuários.
- Criação, edição e exclusão de agendamentos.
- Visualização de agendamentos por clientes e profissionais.
- Autenticação segura.

---

## Estrutura do Projeto

- **`src/`** → código-fonte do backend  
  - `server.js`: ponto de entrada da aplicação.  
  - `routes/`: rotas da API (ex.: `usuarios.js`, `agenda.js`).  
  - `controllers/`: lógica de negócio.  
  - `db.js`: configuração da conexão com PostgreSQL.  

- **`public/`** → páginas HTML e arquivos estáticos  
  - `cadastro.html` → cadastro de usuário  
  - `login.html` → login de usuário  
  - `egendar.html` → agendamento de serviços  
  - `meusAgendamentos.html` → listagem de agendamentos  
  - `editarPerfil.html` → edição de perfil  
  - `home.html` / `paginaInicial.html` → navegação principal  

- **`.env`** → variáveis de ambiente (credenciais do banco e chave JWT).  
- **`package.json`** → dependências e scripts do projeto.  
- **`README.md`** → documentação do projeto.  

---

## Tecnologias Utilizadas
- **Node.js** – ambiente de execução JavaScript.  
- **Express.js** – framework para criação de rotas e APIs.  
- **PostgreSQL** – banco de dados relacional.  
- **pgAdmin 4** – administração do banco.  
- **Postman** – testes das rotas da API.    
- **JWT (JSON Web Token)** – autenticação de usuários.  

---

## Como Executar

1. Clone o repositório:
 
   git clone https://github.com/Vostrojose/SistemaAgendamento.git