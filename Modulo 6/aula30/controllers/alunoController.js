const Aluno = require('../models/Aluno');

exports.listar = async (req, res) => {
  try {
    const alunos = await Aluno.find().sort({ nome: 1 });
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    res.json({ mensagem: 'Removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
