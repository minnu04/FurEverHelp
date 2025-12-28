import express from 'express';
import {
  createCampaign,
    getCampaigns,
    getCampaignById,
} from '../controllers/campaignController.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// CREATE CAMPAIGN - Owner/Shelter
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['Owner', 'Shelter']),
    createCampaign
);

// public routes

router.get('/', getCampaigns);
router.get('/:id', getCampaignById);

export default router;