export const calculateProgressPercentage = (raisedAmount = 0, goalAmount = 0) => {
	if (!goalAmount || goalAmount <= 0) {
		return 0;
	}

	const percentage = (Number(raisedAmount) / Number(goalAmount)) * 100;
	return Math.min(100, Math.round(percentage));
};

export const calculateUniqueDonorCount = (donations = []) => {
	const donorIds = new Set(
		donations
			.map((donation) => donation?.donor?._id?.toString?.() || donation?.donor?.toString?.())
			.filter(Boolean)
	);

	return donorIds.size;
};

export const calculateDonationTotal = (donations = []) => {
	return donations.reduce((total, donation) => total + Number(donation?.amount || 0), 0);
};

export const calculateCampaignCounts = (campaigns = []) => {
	return {
		total: campaigns.length,
		approved: campaigns.filter((campaign) => campaign.campaignStatus === 'Approved').length,
		pending: campaigns.filter((campaign) => campaign.campaignStatus === 'Pending').length,
		rejected: campaigns.filter((campaign) => campaign.campaignStatus === 'Rejected').length,
	};
};
