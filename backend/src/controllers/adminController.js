import Campaign from '../models/Campaign.js';
import AdminLog from '../models/AdminLog.js';

export const getPendingCampaigns = async (req, res) => {
    try {
        const pendingCampaigns = await Campaign.find({
             status: 'PENDING' 
            }).populate('creator', 'name email');
        res.status(200).json(pendingCampaigns);
    }   catch (error) { 
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const approveCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        campaign.status = 'APPROVED';
        campaign.approvedAt = req.user._id;

        await campaign.save();

        await AdminLog.create({
            admin: req.user._id,
            action: 'APPROVED_CAMPAIGN',
            campaign: campaign._id
        });

        res.status(200).json({
             message: 'Campaign approved successfully',
             campaign});    
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const rejectCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        campaign.campaignStatus = 'Rejected';

        await campaign.save();

        await AdminLog.create({
            admin: req.user._id,
            action: 'REJECTED_CAMPAIGN',
            campaign: campaign._id,
            reason: req.body.reason
        });
        res.status(200).json({
             message: 'Campaign rejected successfully',
             campaign});    
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};  
