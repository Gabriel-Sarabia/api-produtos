const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const jwt = require('jsonwebtoken'); 

const app = express();
const porta = process.env.PORT || 3000;
const SECRET = 'senha_secreta_do_professor_123'; 

app.use(express.json());

let db;
async function inicializarBanco() {
  db = await open({ filename: './banco.sqlite', driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, preco REAL NOT NULL,
      estoque INTEGER NOT NULL, categoria_id INTEGER,
      FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    );
  `);
}
inicializarBanco();


app.post('/api/login', (req, res) => {
  if (req.body.usuario === 'admin' && req.body.senha === 'admin123') {
    const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: '1h' });
    return res.json({ auth: true, token: token });
  }
  res.status(401).json({ erro: "Usuário ou senha inválidos!" });
});

function verificarToken(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) return res.status(401).json({ erro: "Acesso Negado! Token não fornecido." });

  const token = tokenHeader.replace('Bearer ', '');

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ erro: "Token inválido ou expirado." });
    req.userId = decoded.userId; 
    next(); 
  });
}


app.get('/api/produtos', async (req, res) => {
  const limite = parseInt(req.query.limite) || 5;
  const pagina = parseInt(req.query.pagina) || 1;
  const offset = (pagina - 1) * limite;

  let query = `SELECT p.id, p.nome, p.preco, p.estoque, c.nome as categoria FROM produtos p JOIN categorias c ON p.categoria_id = c.id WHERE 1=1`;
  let params = [];

  if (req.query.categoria) {
    query += ` AND c.nome LIKE ?`;
    params.push(`%${req.query.categoria}%`);
  }
  query += req.query.ordenar === 'preco' ? ` ORDER BY p.preco ASC` : ` ORDER BY p.id ASC`;
  query += ` LIMIT ? OFFSET ?`;
  params.push(limite, offset);

  try {
    const produtos = await db.all(query, params);
    const total = await db.get('SELECT COUNT(*) as count FROM produtos');
    res.status(200).json({ pagina_atual: pagina, itens_por_pagina: limite, total_produtos: total.count, produtos });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar no banco." });
  }
});

app.get('/api/produtos/:id', async (req, res) => {
  const produto = await db.get(`SELECT p.id, p.nome, p.preco, p.estoque, c.nome as categoria FROM produtos p JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?`, [req.params.id]);
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });
  res.status(200).json(produto);
});

app.post('/api/produtos', verificarToken, async (req, res) => {
  const { nome, preco, estoque, categoria_id } = req.body;
  if (!nome || preco === undefined || estoque === undefined || !categoria_id) return res.status(400).json({ erro: "Campos obrigatórios faltando." });
  
  const result = await db.run(`INSERT INTO produtos (nome, preco, estoque, categoria_id) VALUES (?, ?, ?, ?)`, [nome, preco, estoque, categoria_id]);
  res.status(201).json({ id: result.lastID, nome, preco, estoque, categoria_id });
});

app.put('/api/produtos/:id', verificarToken, async (req, res) => {
  const { nome, preco, estoque, categoria_id } = req.body;
  const result = await db.run(`UPDATE produtos SET nome = ?, preco = ?, estoque = ?, categoria_id = ? WHERE id = ?`, [nome, preco, estoque, categoria_id, req.params.id]);
  if (result.changes === 0) return res.status(404).json({ erro: "Produto não encontrado." });
  res.status(200).json({ mensagem: "Produto atualizado!" });
});

app.delete('/api/produtos/:id', verificarToken, async (req, res) => {
  const result = await db.run(`DELETE FROM produtos WHERE id = ?`, [req.params.id]);
  if (result.changes === 0) return res.status(404).json({ erro: "Produto não encontrado." });
  res.status(200).json({ mensagem: "Produto removido!" });
});

app.listen(porta, () => console.log(`🚀 Servidor rodando na porta ${porta} com SQLite e JWT!`));