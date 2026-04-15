# 🛒 API Rest de Produtos - Node.js (CRUD Completo)

Este projeto é a evolução (Atividade 2) da API REST desenvolvida para a disciplina de **Desenvolvimento de Aplicativos Móveis**. O sistema agora conta com um CRUD 100% implementado, validações de dados e tratamento de erros.

## 📋 Funcionalidades
* Base de dados inicial com 10 produtos.
* Listagem completa, com filtros por categoria e ordenação de preço (GET).
* Busca detalhada por ID (GET).
* Criação de novos produtos com validação de campos obrigatórios (POST).
* Atualização de registros existentes (PUT).
* Exclusão de produtos (DELETE).

## 🛠️ Tratamento de Erros e Validações
* **Status 200 / 201:** Sucesso nas requisições e criações.
* **Status 400 (Bad Request):** Disparado quando o usuário tenta criar/atualizar um produto faltando campos (nome, preco, categoria, estoque).
* **Status 404 (Not Found):** Disparado ao tentar buscar, atualizar ou deletar um ID que não existe.

## 🚀 Como Rodar o Projeto
1. Instale as dependências:
   ```bash
   npm install

##  Deploy em Produção
A API está hospedada no Render e pode ser acessada de qualquer lugar.
**Link Base da API:** `https://api-produtos-gabriel-sarabia.onrender.com`

*Para testar as rotas, basta substituir `http://localhost:3000` por este link no Postman.*