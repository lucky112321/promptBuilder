import api from '../api/client';
import PricingCard from '../components/PricingCard';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const plans = [
  { key: 'starter', name: 'Starter', price: '₹49/month', features: ['50 prompts/day', 'Improved prompt quality'] },
  { key: 'pro', name: 'Pro', price: '₹149/month', features: ['Unlimited prompts', 'All premium categories', 'All prompt packs included'] },
  { key: 'yearly', name: 'Yearly', price: '₹999/year', badge: '2 months free', features: ['Everything in Pro', 'Best value for growth'] }
];

export default function PricingPage() {
  const { user, refreshProfile } = useAuth();

  const handleSelect = async (plan) => {
    if (!user) {
      alert('Please login first.');
      return;
    }

    const { data } = await api.post('/payment/create-order', { plan });

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: 'Prompt Builder',
      description: `${plan} subscription`,
      order_id: data.orderId,
      handler: async (response) => {
        await api.post('/payment/verify', {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature
        });
        await refreshProfile();
        alert('Subscription activated successfully!');
      }
    };

    if (window.Razorpay) {
      new window.Razorpay(options).open();
    } else {
      alert(`Order created (${data.orderId}). Razorpay script not loaded in this environment.`);
    }
  };

  return (
    <div className="py-10">
      <div className="text-center mx-auto max-w-2xl mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl"
        >
          Choose your <span className="text-gradient">growth plan</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-slate-400"
        >
          Free plan includes 5 prompts/day. Upgrade anytime to scale your output infinitely faster.
        </motion.p>
      </div>
      
      <div className="mt-8 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto items-center">
        {plans.map((plan, idx) => (
          <PricingCard key={plan.key} plan={plan} index={idx} highlighted={plan.key === 'pro'} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
