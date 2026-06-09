const jwt     = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registrar = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(201).json({
      token,
      usuario: {
        id:    usuario._id,
        nome:  usuario.nome,
        email: usuario.email,
        role:  usuario.role
      }
    });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ erro: 'Email ja cadastrado' });
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha)
      return res.status(400).json({ erro: 'Email e senha sao obrigatorios' });

    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararSenha(senha)))
      return res.status(401).json({ erro: 'Credenciais invalidas' });

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({
      token,
      usuario: {
        id:    usuario._id,
        nome:  usuario.nome,
        email: usuario.email,
        role:  usuario.role
      }
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).select('-senha');
    if (!usuario) return res.status(404).json({ erro: 'Usuario nao encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
