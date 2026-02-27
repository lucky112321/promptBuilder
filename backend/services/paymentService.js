import crypto from 'crypto';
import Razorpay from 'razorpay';

const instance =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      })
    : null;

export const createRazorpayOrder = async ({ amount, receipt }) => {
  if (!instance) {
    return {
      id: `mock_order_${Date.now()}`,
      amount,
      currency: 'INR',
      receipt
    };
  }

  return instance.orders.create({
    amount,
    currency: 'INR',
    receipt
  });
};

export const verifySignature = ({ orderId, paymentId, signature }) => {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    return true;
  }

  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};
