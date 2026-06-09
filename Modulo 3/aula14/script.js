// Array de produtos
let produtos = [
  { nome: "Smartphone X Pro", preco: 2499.90, categoria: "Eletrônicos" },
  { nome: "Camiseta Básica",   preco: 59.90,  categoria: "Roupas" },
  { nome: "Fone Bluetooth",    preco: 349.00,  categoria: "Eletrônicos" },
  { nome: "Tênis Running",     preco: 299.90,  categoria: "Calçados" },
  { nome: "Notebook Slim",     preco: 3799.00, categoria: "Eletrônicos" },
];

const container = document.getElementById('container');

function formatarPreco(preco) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function criarCard(produto) {
  const div = document.createElement('div');
  div.className = 'card';
  div.dataset.categoria = produto.categoria;
  div.innerHTML = `
    <div class="card-categoria">${produto.categoria}</div>
    <div class="card-nome">${produto.nome}</div>
    <div class="card-preco">${formatarPreco(produto.preco)}</div>
  `;
  return div;
}

function renderizarProdutos() {
  container.innerHTML = '';
  produtos.forEach(p => container.appendChild(criarCard(p)));
}

renderizarProdutos();

// Botão "Mostrar só eletrônicos"
document.getElementById('btnEletronicos').addEventListener('click', () => {
  const btn = document.getElementById('btnEletronicos');
  btn.classList.toggle('ativo');

  const cards = container.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.toggle('oculto', btn.classList.contains('ativo') && card.dataset.categoria !== 'Eletrônicos');
  });
});

// Botão "Limpar"
document.getElementById('btnLimpar').addEventListener('click', () => {
  container.innerHTML = '';
  document.getElementById('btnEletronicos').classList.remove('ativo');
});

// Desafio extra: inserir novo produto
document.getElementById('btnAdicionar').addEventListener('click', () => {
  const nome      = document.getElementById('inputNome').value.trim();
  const preco     = parseFloat(document.getElementById('inputPreco').value);
  const categoria = document.getElementById('inputCategoria').value.trim();

  if (!nome || isNaN(preco) || !categoria) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  const novoProduto = { nome, preco, categoria };
  produtos.push(novoProduto);
  container.appendChild(criarCard(novoProduto));

  document.getElementById('inputNome').value = '';
  document.getElementById('inputPreco').value = '';
  document.getElementById('inputCategoria').value = '';
});
