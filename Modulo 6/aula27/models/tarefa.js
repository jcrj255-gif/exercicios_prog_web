let tarefas = [
  { id: 1, titulo: 'Estudar Node.js', concluida: false },
  { id: 2, titulo: 'Criar API REST',  concluida: false },
];
let proximoId = 3;

module.exports = {
  listarTodos: ()      => tarefas,
  buscarPorId: (id)    => tarefas.find(t => t.id === parseInt(id)),
  criar: (dados) => {
    const nova = { id: proximoId++, titulo: dados.titulo, concluida: false };
    tarefas.push(nova);
    return nova;
  },
  atualizar: (id, dados) => {
    const idx = tarefas.findIndex(t => t.id === parseInt(id));
    if (idx === -1) return null;
    tarefas[idx] = { ...tarefas[idx], ...dados };
    return tarefas[idx];
  },
  remover: (id) => {
    const idx = tarefas.findIndex(t => t.id === parseInt(id));
    if (idx === -1) return null;
    return tarefas.splice(idx, 1)[0];
  }
};
