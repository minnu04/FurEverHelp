import express from 'express';
import {
  getPendingCampaigns,
  approveCampaign,
  rejectCampaign
} from '../controllers/adminController.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/campaigns/pending', 
    authMiddleware, 
    roleMiddleware('ADMIN'), 
    getPendingCampaigns
);
router.put('/campaigns/:id/approve', 
    authMiddleware,
    roleMiddleware('ADMIN'),
    approveCampaign
);
router.put('/campaigns/:id/reject', 
    authMiddleware,
    roleMiddleware('ADMIN'),
    rejectCampaign
);

export default router;