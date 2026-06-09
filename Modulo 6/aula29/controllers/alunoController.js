const Aluno = require('../models/Aluno');

exports.listar = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.ativo !== undefined) filtro.ativo = req.query.ativo === 'true';

    const alunos = await Aluno.find(filtro)
      .populate('curso', 'nome duracao')
      .sort({ nome: 1 });
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscar = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id).populate('curso', 'nome duracao');
    if (!aluno) return res.status(404).json({ erro: 'Aluno nao encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ erro: err.message });
    if (err.code === 11000) return res.status(400).json({ erro: 'Email ja cadastrado' });
    res.status(500).json({ erro: 'Erro do servidor' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    ).populate('curso', 'nome duracao');
    if (!aluno) return res.status(404).json({ erro: 'Aluno nao encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.remover = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno nao encontrado' });
    res.json({ mensagem: 'Aluno removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
