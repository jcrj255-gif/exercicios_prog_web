const Curso = require('../models/Curso');

exports.listar = async (req, res) => {
  try {
    const cursos = await Curso.find().sort({ nome: 1 });
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ erro: 'Curso ja existe' });
    res.status(400).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!curso) return res.status(404).json({ erro: 'Curso nao encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.remover = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ erro: 'Curso nao encontrado' });
    res.json({ mensagem: 'Curso removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
