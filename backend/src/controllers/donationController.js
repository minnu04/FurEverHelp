import razorpay from '../config/razorpay.js';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import crypto from 'crypto';

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

export const verfiyPayment = async(req,res)=>{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature, 
        }= req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({ message: 'Invalid signature' });
        }
        const donation = await Donation.findOne({ 
            orderId: razorpay_order_id });

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        if (donation.status === 'Paid') {
            return res.status(200).json({ message: 'Already Verified' });
        }

        donation.paymentId = razorpay_payment_id;
        donation.signature = razorpay_signature;
        donation.status = 'Paid';
        await donation.save();

        await Campaign.findByIdAndUpdate(donation.campaign, {
            $inc: { raisedAmount: donation.amount },
        });
        res.status(200).json({ message: 'Payment Verified Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}