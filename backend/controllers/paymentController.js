import Payment from '../models/Payment.js';
import User from '../models/User.js';
import { createRazorpayOrder, verifySignature } from '../services/paymentService.js';
import { PLAN_AMOUNTS, PLAN_EXPIRY_DAYS } from '../utils/planLimits.js';

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const createOrder = async (req, res) => {
  const { plan } = req.body;
  const amount = PLAN_AMOUNTS[plan];

  if (!amount) {
    return res.status(400).json({ message: 'Invalid plan selected' });
  }

  const order = await createRazorpayOrder({
    amount,
    receipt: `receipt_${req.user._id}_${Date.now()}`
  });

  await Payment.create({
    user: req.user._id,
    razorpayOrderId: order.id,
    amount,
    currency: order.currency || 'INR',
    status: 'created',
    plan
  });

  return res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID || 'mock_key',
    plan
  });
};

export const verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const payment = await Payment.findOne({ razorpayOrderId });
  if (!payment) {
    return res.status(404).json({ message: 'Payment record not found' });
  }

  const isValid = verifySignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature
  });

  if (!isValid) {
    payment.status = 'failed';
    await payment.save();
    return res.status(400).json({ message: 'Payment signature verification failed' });
  }

  payment.razorpayPaymentId = razorpayPaymentId;
  payment.razorpaySignature = razorpaySignature;
  payment.status = 'paid';
  await payment.save();

  const user = await User.findById(payment.user);
  user.plan = payment.plan;
  user.planExpiry = addDays(new Date(), PLAN_EXPIRY_DAYS[payment.plan]);
  await user.save();

  return res.json({
    message: 'Payment verified and subscription updated',
    plan: user.plan,
    planExpiry: user.planExpiry
  });
};
