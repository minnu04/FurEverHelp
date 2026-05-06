import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { getCreatorDashboard, getDonorDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/donor', authMiddleware, roleMiddleware('Donor', 'Student', 'Faculty'), getDonorDashboard);
router.get('/creator', authMiddleware, roleMiddleware('Owner', 'Shelter'), getCreatorDashboard);

export default router;
