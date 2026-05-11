import multer from 'multer';

// Use memory storage for direct stream to Cloudinary
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
	const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

	if (allowedMimes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error(`Invalid file type. Allowed types: JPG, JPEG, PNG, WEBP`), false);
	}
};

// Configure multer for campaign image uploads
const campaignImageUpload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB per file
	},
});

export default campaignImageUpload;
