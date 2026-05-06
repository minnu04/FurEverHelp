import express from "express";
import {
  createOrder,
  verfiyPayment,
} from "../controllers/donationController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import { paymentLimiter } from '../middlewares/reteLimiter.js';
import { validateBody } from '../utils/validateRequest.js';

const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  paymentLimiter,
  validateBody({
    campaignId: { required: true, type: 'objectId' },
    amount: { required: true, type: 'number', min: 1 },
  }),
  createOrder
);

router.post(
  "/verify",
  authMiddleware,
  paymentLimiter,
  validateBody({
    razorpay_order_id: { required: true, type: 'string' },
    razorpay_payment_id: { required: true, type: 'string' },
    razorpay_signature: { required: true, type: 'string' },
  }),
  verfiyPayment
);

export default router;