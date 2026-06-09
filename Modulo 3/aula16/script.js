const inputPokemon = document.getElementById('inputPokemon');
const btnBuscar    = document.getElementById('btnBuscar');
const btnAnterior  = document.getElementById('btnAnterior');
const btnProximo   = document.getElementById('btnProximo');
const resultado    = document.getElementById('resultado');
const numAtual     = document.getElementById('numAtual');

// Mapeamento de cores por tipo
const coresTipo = {
  fire:'#FF6B35',water:'#4A90E2',grass:'#56A14B',electric:'#c9a800',
  psychic:'#FF5FA0',ice:'#6DC8F3',dragon:'#7038F8',dark:'#5A5360',
  fairy:'#e48fb0',normal:'#78785a',fighting:'#C03028',flying:'#6860c0',
  poison:'#A040A0',ground:'#b07800',rock:'#887820',bug:'#708010',
  ghost:'#4e3070',steel:'#787890'
};

let pokemonAtual = 1;

function mostrarCarregando() {
  resultado.innerHTML = '<p class="mensagem">⏳ Carregando...</p>';
}

async function buscarPokemon(id) {
  mostrarCarregando();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Não encontrado');
    const data = await res.json();
    pokemonAtual = data.id;
    numAtual.textContent = `#${String(data.id).padStart(3,'0')}`;
    renderizarCard(data);
  } catch (err) {
    resultado.innerHTML = `<p class="mensagem erro">❌ Pokémon não encontrado!</p>`;
  }
}

function renderizarCard(data) {
  const tipo1    = data.types[0].type.name;
  const cor      = coresTipo[tipo1] || '#666';
  const tipos    = data.types.map(t => `<span class="tipo">${t.type.name}</span>`).join('');
  const imagem   = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

  const statsNomes = { hp:'HP', attack:'Ataque', defense:'Defesa', 'special-attack':'Sp. Atk', 'special-defense':'Sp. Def', speed:'Velocidade' };
  const statsHtml = data.stats.map(s => `
    <div class="stat">
      <div class="stat-header"><span>${statsNomes[s.stat.name] || s.stat.name}</span><span>${s.base_stat}</span></div>
      <div class="stat-bar-bg"><div class="stat-bar" style="width:${Math.min(s.base_stat, 150) / 150 * 100}%"></div></div>
    </div>
  `).join('');

  resultado.innerHTML = `
    <div class="poke-card" style="background: linear-gradient(135deg, ${cor}cc, ${cor}88);">
      <div class="poke-id">#${String(data.id).padStart(3,'0')}</div>
      <div class="poke-nome">${data.name}</div>
      <img class="poke-img" src="${imagem}" alt="${data.name}">
      <div class="tipos">${tipos}</div>
      <div class="stats">${statsHtml}</div>
    </div>
  `;
}

// Buscar ao clicar
btnBuscar.addEventListener('click', () => {
  const valor = inputPokemon.value.trim().toLowerCase();
  if (valor) buscarPokemon(valor);
});

// Buscar ao pressionar Enter
inputPokemon.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnBuscar.click();
});

// Desafio extra: navegar por número
btnAnterior.addEventListener('click', () => {
  if (pokemonAtual > 1) buscarPokemon(pokemonAtual - 1);
});

btnProximo.addEventListener('click', () => {
  buscarPokemon(pokemonAtual + 1);
});

// Carrega o 1º ao abrir
buscarPokemon(1);
