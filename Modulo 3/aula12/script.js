// Variáveis
const nome = "Maria";
const precoProduto = 200;
const percentualDesconto = 15;

// Cálculos
const valorDesconto = precoProduto * (percentualDesconto / 100);
const precoFinal = precoProduto - valorDesconto;

// Verificações
const precoAcimaDe100 = precoProduto > 100;
const descontoValido = percentualDesconto > 0 && percentualDesconto < 100;

// Exibir no console
console.log(`Olá, ${nome}! O produto custa R$ ${precoProduto}`);
console.log(`Desconto de ${percentualDesconto}%: R$ ${valorDesconto}`);
console.log(`Preço final: R$ ${precoFinal}`);
console.log(`Preço acima de R$ 100? ${precoAcimaDe100}`);
console.log(`Desconto válido? ${descontoValido}`);

// Exibir na página
const resultadoEl = document.getElementById('resultado');

const linhas = [
  { texto: `Olá, ${nome}! O produto custa R$ ${precoProduto}`, classe: '' },
  { texto: `Desconto de ${percentualDesconto}%: R$ ${valorDesconto}`, classe: 'alerta' },
  { texto: `Preço final: R$ ${precoFinal}`, classe: 'destaque' },
  { texto: `Preço acima de R$ 100? ${precoAcimaDe100}`, classe: '' },
  { texto: `Desconto válido? ${descontoValido}`, classe: '' },
];

linhas.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = `linha ${item.classe}`;
  div.textContent = item.texto;
  div.style.animationDelay = `${i * 0.12}s`;
  resultadoEl.appendChild(div);
});
