import Campaign from '../models/Campaign.js';
import Donation from '../models/Donation.js';
import { calculateCampaignCounts, calculateDonationTotal, calculateProgressPercentage, calculateUniqueDonorCount } from '../utils/calculateStats.js';

export const getDonorDashboard = async (req, res) => {
	try {
		const donations = await Donation.find({ donor: req.user._id, status: 'Paid' })
			.populate('campaign', 'title category goalAmount raisedAmount campaignStatus treatmentStatus images pet')
			.sort({ createdAt: -1 });

		const supportedCampaigns = donations
			.map((donation) => donation.campaign)
			.filter(Boolean);

		const totalDonated = calculateDonationTotal(donations);

		const campaignProgress = supportedCampaigns.map((campaign) => ({
			_id: campaign._id,
			title: campaign.title,
			category: campaign.category,
			goalAmount: campaign.goalAmount,
			raisedAmount: campaign.raisedAmount,
			progressPercentage: calculateProgressPercentage(campaign.raisedAmount, campaign.goalAmount),
			treatmentStatus: campaign.treatmentStatus,
		}));

		res.status(200).json({
			donations,
			supportedCampaigns: campaignProgress,
			summary: {
				totalDonated,
				donationCount: donations.length,
				supportedCampaignCount: supportedCampaigns.length,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

export const getCreatorDashboard = async (req, res) => {
	try {
		const campaigns = await Campaign.find({ createdBy: req.user._id })
			.populate('approvedBy', 'name email role')
			.sort({ createdAt: -1 });

		const campaignIds = campaigns.map((campaign) => campaign._id);
		const donations = await Donation.find({ campaign: { $in: campaignIds }, status: 'Paid' })
			.populate('donor', 'name email role')
			.sort({ createdAt: -1 });

		const campaignCounts = calculateCampaignCounts(campaigns);

		const campaignsWithProgress = campaigns.map((campaign) => ({
			_id: campaign._id,
			title: campaign.title,
			category: campaign.category,
			campaignStatus: campaign.campaignStatus,
			treatmentStatus: campaign.treatmentStatus,
			goalAmount: campaign.goalAmount,
			raisedAmount: campaign.raisedAmount,
			progressPercentage: calculateProgressPercentage(campaign.raisedAmount, campaign.goalAmount),
			donorCount: calculateUniqueDonorCount(
				donations.filter((donation) => donation.campaign.toString() === campaign._id.toString())
			),
		}));

		res.status(200).json({
			campaigns: campaignsWithProgress,
			donations,
			summary: {
				...campaignCounts,
				totalDonations: donations.length,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};
