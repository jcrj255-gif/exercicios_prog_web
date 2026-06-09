const router = require('express').Router();
const ctrl   = require('../controllers/cursoController');

router.get('/',       ctrl.listar);
router.post('/',      ctrl.criar);
router.put('/:id',    ctrl.atualizar);
router.delete('/:id', ctrl.remover);

module.exports = router;
