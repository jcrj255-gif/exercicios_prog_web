const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome e obrigatorio'],
    minlength: [3, 'Minimo 3 caracteres'],
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalido']
  },
  idade: {
    type: Number,
    min: [16, 'Min. 16 anos'],
    max: [100, 'Max. 100 anos']
  },
  
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso'
  },
  notas: [Number],
  ativo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Aluno', alunoSchema);
