import api from '../api/client';
import PricingCard from '../components/PricingCard';
import { useAuth } from '../hooks/useAuth';

const plans = [
  { key: 'free', name: 'Free', price: '₹0/month', features: ['5 prompts/day', 'Basic categories', 'Community support'] },
  { key: 'starter', name: 'Starter', price: '₹49/month', features: ['50 prompts/day', 'Improved prompt quality', 'Priority queue'] },
  { key: 'pro', name: 'Pro', price: '₹149/month', badge: 'Save up to 20% yearly', features: ['Unlimited prompts', 'All premium categories', 'Prompt pack library', 'Best for teams'] }
];

export default function PricingPage() {
  const { user, refreshProfile } = useAuth();

  const handleSelect = async (plan) => {
    if (plan === 'free') return;
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
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#F9FAFB]">Pricing built for growth</h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-400">Choose the right plan now and scale your prompt operations without friction.</p>
      </div>
      <div className="mx-auto inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
        Yearly Savings Available
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.key} plan={plan} highlighted={plan.key === 'pro'} onSelect={handleSelect} />
        ))}
      </div>
    </section>
  );
}
