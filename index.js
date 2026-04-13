const express = require('express');
const app = express();
const porta = 3000;

app.use(express.json());

let produtos = [
  { id: 1, nome: "Notebook Dell", preco: 4500.00, categoria: "Eletronicos", estoque: 10 },
  { id: 2, nome: "Smartphone Samsung", preco: 2500.00, categoria: "Eletronicos", estoque: 25 },
  { id: 3, nome: "Cadeira Ergonomica", preco: 800.00, categoria: "Moveis", estoque: 15 },
  { id: 4, nome: "Mesa de Escritorio", preco: 1200.00, categoria: "Moveis", estoque: 5 },
  { id: 5, nome: "Fone de Ouvido Bluetooth", preco: 300.00, categoria: "Eletronicos", estoque: 50 },
  { id: 6, nome: "Monitor Ultrawide", preco: 1800.00, categoria: "Eletronicos", estoque: 8 },
  { id: 7, nome: "Teclado Mecanico", preco: 450.00, categoria: "Eletronicos", estoque: 30 },
  { id: 8, nome: "Mouse Gamer", preco: 250.00, categoria: "Eletronicos", estoque: 40 },
  { id: 9, nome: "Estante de Livros", preco: 600.00, categoria: "Moveis", estoque: 12 },
  { id: 10, nome: "Sofá 3 Lugares", preco: 2200.00, categoria: "Moveis", estoque: 3 }
];


app.get('/api/produtos', (req, res) => {
  let resultado = produtos;

  if (req.query.categoria) {
    resultado = resultado.filter(p => p.categoria.toLowerCase() === req.query.categoria.toLowerCase());
  }
  if (req.query.ordenar === 'preco') {
    resultado = resultado.slice().sort((a, b) => a.preco - b.preco);
  }

  res.status(200).json(resultado);
});

app.get('/api/produtos/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === idBuscado);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado." });
  }
  
  res.status(200).json(produto);
});

app.post('/api/produtos', (req, res) => {
  const { nome, preco, categoria, estoque } = req.body;

  if (!nome || preco === undefined || !categoria || estoque === undefined) {
    return res.status(400).json({ erro: "Todos os campos (nome, preco, categoria, estoque) são obrigatórios!" });
  }

  if (typeof preco !== 'number' || typeof estoque !== 'number') {
    return res.status(400).json({ erro: "Preço e estoque devem ser números válidos!" });
  }

  const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
  const novoProduto = { id: novoId, nome, preco, categoria, estoque };
  
  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
});

app.put('/api/produtos/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const { nome, preco, categoria, estoque } = req.body;

  const index = produtos.findIndex(p => p.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado para atualização." });
  }

  if (!nome || preco === undefined || !categoria || estoque === undefined) {
    return res.status(400).json({ erro: "Todos os campos devem ser preenchidos." });
  }

  if (typeof preco !== 'number' || typeof estoque !== 'number') {
    return res.status(400).json({ erro: "Preço e estoque devem ser números válidos!" });
  }

  produtos[index] = { id: idBuscado, nome, preco, categoria, estoque };

  res.status(200).json(produtos[index]);
});

app.delete('/api/produtos/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado para exclusão." });
  }

  produtos.splice(index, 1);

  res.status(200).json({ mensagem: `Produto com ID ${idBuscado} removido com sucesso.` });
});

app.listen(porta, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${porta}`);
});