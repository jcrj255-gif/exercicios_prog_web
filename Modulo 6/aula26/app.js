const fs   = require('fs');
const http = require('http');
const { formatarMoeda, calcularMedia, formatarData } = require('./utils');

const preco  = formatarMoeda(1999.9);
const media  = calcularMedia([8.5, 7.0, 9.5, 6.0]);
const hoje   = formatarData();

console.log('Preco formatado:', preco);
console.log('Media das notas:', media);
console.log('Data de hoje:',    hoje);

const conteudo = `Relatorio gerado em ${hoje}\n\nPreco: ${preco}\nMedia: ${media}\n`;
fs.writeFileSync('resultado.txt', conteudo, 'utf-8');
console.log('Arquivo resultado.txt criado!');

const dados = {
  produtos: [
    { id: 1, nome: 'Notebook', preco: 3500 },
    { id: 2, nome: 'Mouse',    preco: 120  },
    { id: 3, nome: 'Teclado',  preco: 250  },
  ]
};
fs.writeFileSync('dados.json', JSON.stringify(dados, null, 2));

const server = http.createServer((req, res) => {
  if (req.url === '/dados') {
    
    const json = fs.readFileSync('dados.json', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(json);
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="UTF-8"><title>Node.js Aula 26</title>
    <style>
      body{font-family:sans-serif;background:#0f0f0f;color:#f0f0f0;
           display:flex;align-items:center;justify-content:center;
           height:100vh;flex-direction:column;gap:1rem}
      h1{color:#6ee7b7} p{color:#aaa} a{color:#a5b4fc}
    </style>
    </head>
    <body>
      <h1>Servidor Node.js funcionando!</h1>
      <p>Preco: <strong>${preco}</strong> | Media: <strong>${media}</strong></p>
      <p>Acesse <a href="/dados">/dados</a> para ver o JSON</p>
    </body></html>
  `);
});

server.listen(3000, () => console.log('Servidor em http:
