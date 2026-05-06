import mongoose from 'mongoose';

const updateSchema = new mongoose.Schema(
	{
		campaign: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Campaign',
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		treatmentStatus: {
			type: String,
			enum: ['Pending Treatment', 'Under Treatment', 'Recovered', 'Adopted', 'Memorial'],
			required: true,
		},
		images: [{ type: String }],
		documents: [{ type: String }],
	},
	{ timestamps: true }
);

export default mongoose.model('Update', updateSchema);
