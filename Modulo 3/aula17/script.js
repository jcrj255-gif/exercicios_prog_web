// ── Variáveis globais ──
let perguntas = [];
let atual     = 0;
let pontos    = 0;
let respondeu = false;

// ── Referências ao DOM ──
const elInicio     = document.getElementById('inicio');
const elQuiz       = document.getElementById('quiz');
const elResultado  = document.getElementById('resultado');
const elProgresso  = document.getElementById('progresso');
const elPontosLive = document.getElementById('pontos-live');
const elBarra      = document.getElementById('barraProgresso');
const elPergunta   = document.getElementById('pergunta');
const elOpcoes     = document.getElementById('opcoes');

// ── Passo 2: Buscar perguntas ──
async function buscarPerguntas() {
  const url = 'https://tryvia.ptr.red/api.php?amount=10&type=multiple';
  try {
    const res  = await fetch(url);
    const data = await res.json();
    perguntas  = data.results;
  } catch (erro) {
    console.error('Erro ao buscar perguntas:', erro);
    elQuiz.innerHTML = '<p style="color:#f87171;text-align:center;padding:2rem">Erro ao carregar perguntas. Tente novamente.</p>';
  }
}

// ── Passo 3: Embaralhar alternativas ──
function embaralhar(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getAlternativas(pergunta) {
  return embaralhar([...pergunta.incorrect_answers, pergunta.correct_answer]);
}

// ── Passo 4: Exibir pergunta ──
function exibirPergunta() {
  respondeu = false;
  const p            = perguntas[atual];
  const alternativas = getAlternativas(p);
  const percentual   = ((atual + 1) / perguntas.length) * 100;

  elProgresso.textContent  = `Pergunta ${atual + 1} / ${perguntas.length}`;
  elBarra.style.width      = `${percentual}%`;
  elPergunta.innerHTML     = p.question;

  elOpcoes.innerHTML = '';
  alternativas.forEach(alt => {
    const btn       = document.createElement('button');
    btn.innerHTML   = alt;
    btn.className   = 'opcao';
    elOpcoes.appendChild(btn);
  });
}

// ── Passo 5: Verificar resposta (delegação de eventos) ──
elOpcoes.addEventListener('click', (e) => {
  if (respondeu) return;
  if (!e.target.classList.contains('opcao')) return;

  respondeu = true;

  const resposta = e.target.innerHTML;
  const correta  = perguntas[atual].correct_answer;

  // Desabilitar todos os botões
  elOpcoes.querySelectorAll('.opcao').forEach(btn => {
    btn.disabled = true;
    if (btn.innerHTML === correta) btn.classList.add('correta');
  });

  if (resposta === correta) {
    pontos++;
    e.target.classList.add('correta');
  } else {
    e.target.classList.add('errada');
  }

  elPontosLive.textContent = `${pontos} pts`;

  // Avançar após 1.2 segundos
  setTimeout(() => {
    atual++;
    if (atual < perguntas.length) {
      exibirPergunta();
    } else {
      exibirResultado();
    }
  }, 1200);
});

// ── Passo 6: Tela de resultado ──
function exibirResultado() {
  elQuiz.hidden     = true;
  elResultado.hidden = false;

  const total = perguntas.length;
  const pct   = Math.round((pontos / total) * 100);

  // Desafio: salvar recorde no localStorage
  const recorde = parseInt(localStorage.getItem('quiz-recorde') || '0');
  if (pontos > recorde) localStorage.setItem('quiz-recorde', pontos);
  const melhorRecorde = Math.max(pontos, recorde);

  let msg = '😅 Tente novamente!';
  if (pct >= 80) msg = '🏆 Excelente!';
  else if (pct >= 60) msg = '👏 Bom trabalho!';
  else if (pct >= 40) msg = '📚 Continue praticando!';

  elResultado.innerHTML = `
    <h2>${msg}</h2>
    <div class="placar">${pct}%</div>
    <p>${pontos} de ${total} corretas &nbsp;|&nbsp; 🏅 Recorde: ${melhorRecorde}</p>
    <button id="btnReiniciar">🔄 Jogar novamente</button>
  `;

  document.getElementById('btnReiniciar').addEventListener('click', reiniciar);
}

// ── Iniciar quiz ──
async function iniciar() {
  elInicio.hidden = true;
  elQuiz.hidden   = false;
  atual           = 0;
  pontos          = 0;
  elPontosLive.textContent = '0 pts';
  elBarra.style.width = '0%';

  elPergunta.textContent = 'Carregando perguntas...';
  elOpcoes.innerHTML = '';

  await buscarPerguntas();
  if (perguntas.length > 0) exibirPergunta();
}

function reiniciar() {
  elResultado.hidden = true;
  iniciar();
}

document.getElementById('btnIniciar').addEventListener('click', iniciar);
