import { Router } from 'express';
import { CultivosController } from '../controller/CultivosController';

const router = Router();

router.post('/', CultivosController.create);
router.get('/', CultivosController.getAll);
router.get('/:id', CultivosController.getById);
router.get('/titulo/:titulo', CultivosController.getByTitle);
router.put('/:id', CultivosController.update);
router.delete('/:id', CultivosController.delete);

export default router; 