import Campaign from '../models/Campaign.js';

export const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      pet: req.body.pet,
      goalAmount: req.body.goalAmount,
      deadline: req.body.deadline,
      createdBy: req.user._id,
    });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyCampaigns = async (req,res)=>{
  try{
    const campaigns = await Campaign.find({
      createdBy: req.user._id})
    .sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}
// GET ALL CAMPAIGNS
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ campaignStatus: 'Approved' })
      .populate('createdBy', 'name role')
      .sort({ createdAt: -1 });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CAMPAIGN BY ID
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

export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (campaign.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this campaign' });
    } 

    campaign.title = req.body.title || campaign.title;
    campaign.description = req.body.description || campaign.description;
    campaign.category = req.body.category || campaign.category;
    campaign.pet = req.body.pet || campaign.pet;
    campaign.goalAmount = req.body.goalAmount || campaign.goalAmount;
    campaign.deadline = req.body.deadline || campaign.deadline;

    campaign.campaignStatus = 'Pending';

    const updatedCampaign = await campaign.save();
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    if (campaign.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this campaign' });
    }
    await campaign.deleteOne();

    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* SEARCH & FILTER CAMPAIGNS */
export const searchCampaigns = async (req, res) => {
  try {
    const {
      keyword,
      category,
      species,
      location,
      urgent,
      progress
    } = req.query;

    let filter = { campaignStatus: "Approved" };

    /* Keyword search */
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ];
    }

    /* Category filter */
    if (category) {
      filter.category = category;
    }

    /* Pet species */
    if (species) {
      filter["pet.species"] = species;
    }

    /* Location */
    if (location) {
      filter["pet.location"] = { $regex: location, $options: "i" };
    }

    /* Urgency (less than 7 days left) */
    if (urgent === "true") {
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      filter.deadline = { $lte: sevenDaysFromNow };
    }

    /* Funding progress */
    if (progress === "funded") {
      filter.$expr = { $gte: ["$raisedAmount", "$goalAmount"] };
    }

    const campaigns = await Campaign.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
