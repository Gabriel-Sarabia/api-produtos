# API Rest de Produtos - Node.js

Este projeto é uma API REST desenvolvida para a disciplina de **Desenvolvimento de Aplicativos Móveis**. O objetivo é gerenciar um inventário de produtos utilizando Node.js e Express.

## Funcionalidades
* Listagem completa de produtos.
* Busca detalhada por ID.
* Filtro por categoria (Eletrônicos e Móveis).
* Ordenação de preços (do menor para o maior).

## Tecnologias
* Node.js v24+
* Express
* Postman (para os testes)

## Como Rodar o Projeto
1. No terminal da pasta do projeto, instale as dependências:
   ```bash
   npm install

2. Inicie o servidor com o comando:
node index.js

3. O servidor estará ativo em: http://localhost:3000

## Endpoints para Testar (URLs)
Copie e cole estes endereços no seu Postman com o servidor ligado:

Listar todos: GET http://localhost:3000/api/produtos

Buscar por ID (Ex: ID 3): GET http://localhost:3000/api/produtos/3

Filtrar Categoria: GET http://localhost:3000/api/produtos?categoria=Eletronicos

Ordenar Preço: GET http://localhost:3000/api/produtos?ordenar=preco