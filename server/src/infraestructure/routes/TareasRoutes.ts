import { Router } from 'express';
import { TareasController } from '../controller/TareasController';

const router = Router();

router.post('/', TareasController.create);
router.get('/', TareasController.getAll);
router.get('/:id', TareasController.getById);
router.get('/titulo/:titulo', TareasController.getByTitulo);
router.get('/usuario/:id_usuarios_huertas', TareasController.getByUsuarioHuertaId);
router.put('/:id', TareasController.update);
router.delete('/:id', TareasController.delete);

export default router; 