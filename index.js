// Importamos a biblioteca Express para criar o servidor
const express = require('express');
const app = express();
const porta = 3000;

// Permite que nossa API entenda dados no formato JSON
app.use(express.json());

/* * PASSO 2: Implementar Array de Dados
 * Lista com 5 produtos, contendo id, nome, preco, categoria e estoque.
 * Categorias utilizadas: "Eletronicos" e "Moveis".
 */
const produtos = [
  { id: 1, nome: "Notebook Dell", preco: 4500.00, categoria: "Eletronicos", estoque: 10 },
  { id: 2, nome: "Smartphone Samsung", preco: 2500.00, categoria: "Eletronicos", estoque: 25 },
  { id: 3, nome: "Cadeira Ergonomica", preco: 800.00, categoria: "Moveis", estoque: 15 },
  { id: 4, nome: "Mesa de Escritorio", preco: 1200.00, categoria: "Moveis", estoque: 5 },
  { id: 5, nome: "Fone de Ouvido Bluetooth", preco: 300.00, categoria: "Eletronicos", estoque: 50 }
];

/* * PASSO 3: Criar Endpoints
 */

// 1. Endpoint para Listar todos (com Filtro de Categoria e Ordenação por Preço)
// Rota: GET /api/produtos
app.get('/api/produtos', (req, res) => {
  // Começamos com a lista completa
  let resultado = produtos;

  // Se o usuário pedir para filtrar por categoria (ex: ?categoria=Moveis)
  if (req.query.categoria) {
    resultado = resultado.filter(produto => 
      // Comparamos ignorando letras maiúsculas/minúsculas
      produto.categoria.toLowerCase() === req.query.categoria.toLowerCase()
    );
  }

  // Se o usuário pedir para ordenar por preço (ex: ?ordenar=preco)
  if (req.query.ordenar === 'preco') {
    // Usamos slice() para criar uma cópia da lista e sort() para ordenar do mais barato ao mais caro
    resultado = resultado.slice().sort((a, b) => a.preco - b.preco);
  }

  // Devolvemos a lista final como resposta
  res.json(resultado);
});

// 2. Endpoint para Buscar por ID
// Rota: GET /api/produtos/:id
app.get('/api/produtos/:id', (req, res) => {
  // Pegamos o ID digitado na URL e transformamos em número (parseInt)
  const idBuscado = parseInt(req.params.id);
  
  // Procuramos o produto específico na nossa lista
  const produtoEncontrado = produtos.find(produto => produto.id === idBuscado);

  if (produtoEncontrado) {
    // Se encontrou, devolve o produto
    res.json(produtoEncontrado);
  } else {
    // Se não encontrou, devolve um erro 404 (Não Encontrado)
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

// Liga o servidor na porta especificada
app.listen(porta, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${porta}`);
});