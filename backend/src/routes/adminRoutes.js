import express from 'express';
import {
  getPendingCampaigns,
  approveCampaign,
    rejectCampaign,
    getAdminLogs
} from '../controllers/adminController.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { validateBody, validateParams } from '../utils/validateRequest.js';

const router = express.Router();

router.get('/campaigns/pending', 
    authMiddleware, 
    roleMiddleware('ADMIN'), 
    getPendingCampaigns
);
router.put('/campaigns/:id/approve', 
    authMiddleware,
    roleMiddleware('ADMIN'),
    validateParams({ id: { required: true, type: 'objectId' } }),
    approveCampaign
);
router.put('/campaigns/:id/reject', 
    authMiddleware,
    roleMiddleware('ADMIN'),
    validateParams({ id: { required: true, type: 'objectId' } }),
    validateBody({ reason: { required: true, type: 'string', minLength: 3 } }),
    rejectCampaign
);

router.get('/logs',
    authMiddleware,
    roleMiddleware('ADMIN'),
    getAdminLogs
);

export default router;