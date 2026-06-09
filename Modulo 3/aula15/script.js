const form         = document.getElementById('formTarefa');
const inputTarefa  = document.getElementById('inputTarefa');
const inputBusca   = document.getElementById('inputBusca');
const lista        = document.getElementById('listaTarefas');

// Carregar do localStorage (desafio extra)
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvar() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizar() {
  lista.innerHTML = '';

  if (tarefas.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhuma tarefa ainda. Adicione uma! 🎯</p>';
    return;
  }

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    if (tarefa.riscada) li.classList.add('riscada');

    li.innerHTML = `
      <span class="texto-tarefa">${tarefa.texto}</span>
      <button class="btn-remover" data-index="${index}">✕</button>
    `;
    li.dataset.index = index;
    lista.appendChild(li);
  });

  filtrarBusca();
}

// Submit do formulário — preventDefault impede reload
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputTarefa.value.trim();
  if (!texto) return;

  tarefas.push({ texto, riscada: false });
  salvar();
  renderizar();
  inputTarefa.value = '';
});

// Delegação de eventos na <ul>
lista.addEventListener('click', (e) => {
  // Botão remover
  if (e.target.classList.contains('btn-remover')) {
    const index = parseInt(e.target.dataset.index);
    tarefas.splice(index, 1);
    salvar();
    renderizar();
    return;
  }

  // Riscar ao clicar na tarefa (no <li> ou no texto)
  const li = e.target.closest('li');
  if (li && li.dataset.index !== undefined) {
    const index = parseInt(li.dataset.index);
    tarefas[index].riscada = !tarefas[index].riscada;
    salvar();
    renderizar();
  }
});

// Busca em tempo real com evento input
function filtrarBusca() {
  const termo = inputBusca.value.toLowerCase();
  lista.querySelectorAll('li').forEach(li => {
    const texto = li.querySelector('.texto-tarefa')?.textContent.toLowerCase() || '';
    li.classList.toggle('oculta', !texto.includes(termo));
  });
}

inputBusca.addEventListener('input', filtrarBusca);

// Renderiza ao carregar
renderizar();
