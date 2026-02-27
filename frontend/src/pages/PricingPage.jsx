import api from '../api/client';
import PricingCard from '../components/PricingCard';
import { useAuth } from '../hooks/useAuth';

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
    <div>
      <h1 className="text-3xl font-bold text-white">Choose your growth plan</h1>
      <p className="mt-2 text-slate-400">Free plan includes 5 prompts/day. Upgrade anytime to scale faster.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.key} plan={plan} highlighted={plan.key === 'pro'} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
