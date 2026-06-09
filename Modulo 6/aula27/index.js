const express = require('express');
const app = express();

app.use(express.json());
app.use(require('./middleware/logger'));
app.use(express.static('public'));
app.use('/tarefas', require('./routes/tarefaRoutes'));

app.use((err, req, res, next) => {
  console.error('[ERRO]', err.message);
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno' });
});

app.listen(3000, () => console.log('API em http:
