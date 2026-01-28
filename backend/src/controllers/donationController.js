import razorpay from '../config/razorpay.js';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';

export const createOrder = async (req,res) =>{
    try {
        const { amount, campaignId } = req.body;

        const campaign = await Campaign.findById(campaignId);
        if (!campaign || campaign.campaignStatus !== 'Approved') {
            return res.status(400).json({ message: 'Invalid campaign' });
        }
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
        });
        await Donation.create({
            donor: req.user._id,
            campaign: campaignId,
            amount,
            orderId: order.id,
            status: 'Created',
        });
        res.status(201).json(order);
    }catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
  } 
};