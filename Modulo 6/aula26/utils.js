function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularMedia(numeros) {
  if (numeros.length === 0) return 0;
  const soma = numeros.reduce((acc, n) => acc + n, 0);
  return (soma / numeros.length).toFixed(2);
}

function formatarData(data = new Date()) {
  return data.toLocaleDateString('pt-BR');
}

module.exports = { formatarMoeda, calcularMedia, formatarData };
