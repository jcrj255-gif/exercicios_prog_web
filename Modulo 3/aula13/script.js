// Array de alunos com nome, nota1, nota2
const alunos = [
  { nome: "Ana Lima",     nota1: 8.5, nota2: 7.0 },
  { nome: "Bruno Souza",  nota1: 4.0, nota2: 5.5 },
  { nome: "Carla Matos",  nota1: 9.0, nota2: 9.5 },
  { nome: "Diego Alves",  nota1: 3.5, nota2: 4.0 },
  { nome: "Elena Costa",  nota1: 7.0, nota2: 6.5 },
];

// Função calcularMedia
function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

// map() — adiciona propriedade media
const alunosComMedia = alunos.map(aluno => ({
  ...aluno,
  media: calcularMedia(aluno.nota1, aluno.nota2)
}));

// filter() — aprovados e reprovados
const aprovados  = alunosComMedia.filter(a => a.media >= 6);
const reprovados = alunosComMedia.filter(a => a.media < 6);

// reduce() — média geral da turma
const mediaGeral = alunosComMedia.reduce((acc, a, _, arr) => {
  return acc + a.media / arr.length;
}, 0);

// Desafio: ordenar por média
const alunosOrdenados = [...alunosComMedia].sort((a, b) => b.media - a.media);

// Console
console.log('=== Turma Completa (ordenada por média) ===');
alunosOrdenados.forEach(a =>
  console.log(`${a.nome} | N1: ${a.nota1} | N2: ${a.nota2} | Média: ${a.media.toFixed(1)} | ${a.media >= 6 ? '✅ Aprovado' : '❌ Reprovado'}`)
);
console.log(`\nAprovados (${aprovados.length}):`, aprovados.map(a => a.nome).join(', '));
console.log(`Reprovados (${reprovados.length}):`, reprovados.map(a => a.nome).join(', '));
console.log(`Média geral da turma: ${mediaGeral.toFixed(2)}`);

// DOM
const turmaEl = document.getElementById('turma');
alunosOrdenados.forEach(a => {
  const div = document.createElement('div');
  const status = a.media >= 6 ? 'aprovado' : 'reprovado';
  div.className = `card-aluno ${status}`;
  div.innerHTML = `
    <div class="nome">${a.nome}</div>
    <div class="notas">N1: ${a.nota1} | N2: ${a.nota2}</div>
    <div class="media">${a.media.toFixed(1)}</div>
    <span class="badge ${status === 'aprovado' ? 'ap' : 'rp'}">${status}</span>
  `;
  turmaEl.appendChild(div);
});

document.getElementById('stats').innerHTML = `
  <div class="stat-item"><span>${aprovados.length}</span> Aprovados</div>
  <div class="stat-item"><span>${reprovados.length}</span> Reprovados</div>
  <div class="stat-item"><span>${mediaGeral.toFixed(1)}</span> Média Geral</div>
`;
