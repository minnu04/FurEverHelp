import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema(
  {
    // Campaign Details

    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        'Medical Care',
        'Rescue & Shelter',
        'Adoption Support',
        'Stray Feeding',
        'Vaccination',
      ],
      required: true,
      trim: true,
    },
    pet: {
      name: { type: String, trim: true },
      species: { type: String, enum: ['Dog', 'Cat', 'Other'], required: true, trim: true },
      breed: { type: String, trim: true },
      age: { type: Number },
      medicalCondition: { type: String, trim: true },
      location: { type: String, trim: true },
    },

    // Funding Information
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },

    // Status and transparecy
    campaignStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    treatmentStatus: {
      type: String,
      enum: ['Pending Treatment', 'Under Treatment', 'Recovered', 'Adopted', 'Memorial'],
      default: 'Pending Treatment',
    },

    // Media (Cloudinary URLs)
    images: [{ type: String }],
    videos: [{ type: String }],

    // Ownership and Admin Control
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Campaign', CampaignSchema);