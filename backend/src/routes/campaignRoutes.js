import express from 'express';
import multer from 'multer';
import {
  createCampaign,
    getCampaigns,
    getCampaignById,
    getMyCampaigns,
    updateCampaign,
    deleteCampaign,
        searchCampaigns
} from '../controllers/campaignController.js';
import {
    createCampaignUpdate,
    getCampaignUpdates,
    uploadCampaignImages,
    reorderCampaignImages,
    deleteCampaignImage,
    setFeaturedImage,
} from '../controllers/uploadController.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import campaignImageUpload from '../middlewares/campaignImageUpload.js';
import { validateBody, validateParams, validateQuery } from '../utils/validateRequest.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// CREATE CAMPAIGN - Owner/Shelter
router.post(
    '/',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter'),
        validateBody({
            title: { required: true, type: 'string', minLength: 3 },
            description: { required: true, type: 'string', minLength: 10 },
            category: { required: true, type: 'string' },
            goalAmount: { required: true, type: 'number', min: 1 },
            deadline: {
                required: true,
                custom: (value) => (Number.isNaN(Date.parse(value)) ? 'deadline must be a valid date' : null),
            },
        }),
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
    validateParams({ id: { required: true, type: 'objectId' } }),
    updateCampaign
);
// DELETE CAMPAIGN - Owner/Shelter
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter'),
    validateParams({ id: { required: true, type: 'objectId' } }),
    deleteCampaign
);
// public routes

router.get(
    "/search",
    validateQuery({
      keyword: { type: 'string' },
      category: { type: 'string' },
      species: { type: 'string' },
      location: { type: 'string' },
      urgent: { enum: ['true', 'false'] },
      progress: { enum: ['funded'] },
    }),
    searchCampaigns
);
router.get('/', getCampaigns);
router.get(
        '/:id/updates',
        validateParams({ id: { required: true, type: 'objectId' } }),
        getCampaignUpdates
);

router.post(
        '/:id/updates',
        authMiddleware,
        roleMiddleware('Owner', 'Shelter', 'Admin'),
        validateParams({ id: { required: true, type: 'objectId' } }),
        upload.array('files', 10),
        validateBody({
            title: { required: true, type: 'string', minLength: 3 },
            description: { required: true, type: 'string', minLength: 5 },
            treatmentStatus: {
                type: 'string',
                enum: ['Pending Treatment', 'Under Treatment', 'Recovered', 'Adopted', 'Memorial'],
            },
        }),
        createCampaignUpdate
);

    router.get('/:id', validateParams({ id: { required: true, type: 'objectId' } }), getCampaignById);

// ===== CAMPAIGN IMAGE ROUTES =====
// Upload images to campaign
router.post(
    '/:id/images',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter', 'Admin'),
    validateParams({ id: { required: true, type: 'objectId' } }),
    campaignImageUpload.array('images', 10),
    uploadCampaignImages
);

// Reorder campaign images
router.put(
    '/:id/images/reorder',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter', 'Admin'),
    validateParams({ id: { required: true, type: 'objectId' } }),
    validateBody({
        imageOrder: { required: true, type: 'array' },
    }),
    reorderCampaignImages
);

// Set featured image
router.put(
    '/:id/featured-image',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter', 'Admin'),
    validateParams({ id: { required: true, type: 'objectId' } }),
    validateBody({
        imageUrl: { required: true, type: 'string' },
    }),
    setFeaturedImage
);

// Delete specific image from campaign
router.delete(
    '/:id/images/:imageUrl',
    authMiddleware,
    roleMiddleware('Owner', 'Shelter', 'Admin'),
    validateParams({ 
        id: { required: true, type: 'objectId' },
        imageUrl: { required: true, type: 'string' }
    }),
    deleteCampaignImage
);

export default router;