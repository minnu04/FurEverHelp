import Campaign from '../models/Campaign.js';
// CREATE CAMPAIGN
// POST /api/campaigns (Owner/Shelter)

export const createCampaign = async (req, res) => {
  try {
    const Campaign =await Campaign.create({
        title : req.body.title,
        description : req.body.description,
        category : req.body.category,
        pet: req.body.pet,
        goalAmount : req.body.goalAmount,
        deadline: req.body.deadline,
        createdBy : req.user._id
    });
    res.status(201).json(Campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// GET ALL CAMPAIGNS
// GET /api/campaigns (Public)

export const getCampaigns = async (req,res)=>{
    try{
        const campaigns = await Campaign.find({ campaignStatus: 'Approved' })
        .populate('createdBy', 'name role')
        .sort({ createdAt: -1 });

        res.status(200).json(campaigns);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};
// GET CAMPAIGN BY ID
// GET /api/campaigns/:id (Public)

export const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
        .populate('createdBy', 'name role');

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        if (campaign.campaignStatus !== 'Approved') {
            return res.status(403).json({ message: 'Campaign not approved' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};