import { Router } from 'express';
import { DashboardController } from '../controller/DashboardController';

const router = Router();

router.get('/counts', DashboardController.getCounts);

export default router; 