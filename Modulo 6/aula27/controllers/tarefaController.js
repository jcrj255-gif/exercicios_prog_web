const Tarefa = require('../models/tarefa');

exports.listar = (req, res) => {
  res.json(Tarefa.listarTodos());
};

exports.buscar = (req, res) => {
  const tarefa = Tarefa.buscarPorId(req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
  res.json(tarefa);
};

exports.criar = (req, res, next) => {
  if (!req.body.titulo) {
    const err = new Error('O campo titulo e obrigatorio');
    err.status = 400;
    return next(err);
  }
  res.status(201).json(Tarefa.criar(req.body));
};

exports.atualizar = (req, res, next) => {
  const atualizada = Tarefa.atualizar(req.params.id, req.body);
  if (!atualizada) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
  res.json(atualizada);
};

exports.remover = (req, res) => {
  const removida = Tarefa.remover(req.params.id);
  if (!removida) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
  res.json({ mensagem: 'Removida com sucesso', tarefa: removida });
};
