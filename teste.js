console.log(" Iniciando teste automatizado da API...");

fetch('http://localhost:3000/api/produtos?limite=1')
  .then(resposta => {
    if (resposta.status === 200) {
      console.log(" TESTE PASSOU: A API está no ar e respondendo corretamente (Status 200)!");
    } else {
      console.log(" TESTE FALHOU: A API retornou status " + resposta.status);
    }
  })
  .catch(erro => {
    console.log(" TESTE FALHOU: O servidor parece estar desligado. Ligue com 'node index.js'");
  });