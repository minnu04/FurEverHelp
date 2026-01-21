import express from 'express';
import {
  createCampaign,
    getCampaigns,
    getCampaignById,
    getMyCampaigns,
    updateCampaign,
    deleteCampaign
} from '../controllers/campaignController.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// CREATE CAMPAIGN - Owner/Shelter
router.post(
    '/',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter'),
    createCampaign
);

// GET MY CAMPAIGNS - Owner/Shelter
router.get(
    '/my',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter'),
    getMyCampaigns
);
// UPDATE CAMPAIGN - Owner/Shelter
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter'),
    updateCampaign
);
// DELETE CAMPAIGN - Owner/Shelter
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter'),
    deleteCampaign
);
// public routes

router.get('/', getCampaigns);
router.get('/:id', getCampaignById);

export default router;