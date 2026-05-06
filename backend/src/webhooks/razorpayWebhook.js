import crypto from "crypto";
import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";

const razorpayWebhook = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ message: "Invalid webhook signature" });
  }

  const event = req.body;

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    const donation = await Donation.findOne({
      orderId: payment.order_id,
    });

    if (donation && donation.status !== "Paid") {
      donation.status = "Paid";
      donation.paymentId = payment.id;
      await donation.save();

      await Campaign.findByIdAndUpdate(donation.campaign, {
        $inc: { raisedAmount: donation.amount },
      });
    }
  }

  res.status(200).json({ status: "Webhook received" });
};

export default razorpayWebhook;