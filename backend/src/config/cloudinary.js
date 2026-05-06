import { v2 as cloudinary } from 'cloudinary';

const requiredKeys = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];

const hasCloudinaryConfig = requiredKeys.every((key) => Boolean(process.env[key]));

if (hasCloudinaryConfig) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
}

export const uploadToCloudinary = (buffer, options = {}) =>
	new Promise((resolve, reject) => {
		if (!hasCloudinaryConfig) {
			reject(new Error('Cloudinary environment variables are not configured'));
			return;
		}

		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: options.folder || 'fur-ever-help',
				resource_type: options.resourceType || 'auto',
				public_id: options.publicId,
			},
			(error, result) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(result);
			}
		);

		uploadStream.end(buffer);
	});

export default cloudinary;
