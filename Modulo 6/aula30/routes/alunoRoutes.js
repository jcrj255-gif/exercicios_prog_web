const router   = require('express').Router();
const ctrl     = require('../controllers/alunoController');
const auth     = require('../middleware/auth');
const soAdmin  = require('../middleware/soAdmin');

router.use(auth);

router.get('/',           ctrl.listar);
router.post('/',          ctrl.criar);
router.put('/:id',        ctrl.atualizar);

router.delete('/:id', soAdmin, ctrl.remover);

module.exports = router;
