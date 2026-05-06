import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { uploadMedia } from '../controllers/uploadController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	'/',
	authMiddleware,
	roleMiddleware('Owner', 'Shelter', 'Admin'),
	upload.array('files', 10),
	uploadMedia
);

export default router;
