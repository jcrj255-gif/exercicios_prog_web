const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do curso e obrigatorio'],
    trim: true,
    unique: true
  },
  descricao: { type: String, trim: true },
  duracao:   { type: Number, min: 1 }, 
  ativo:     { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Curso', cursoSchema);
