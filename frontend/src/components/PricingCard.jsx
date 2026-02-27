import { motion } from 'framer-motion';

export default function PricingCard({ plan, highlighted, onSelect, buttonText = 'Choose Plan' }) {
  return (
    <motion.div whileHover={{ y: -4 }} className={`rounded-2xl border p-6 ${highlighted ? 'border-brand bg-slate-900' : 'border-slate-800 bg-slate-950'}`}>
      <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
      <p className="mt-2 text-3xl font-bold text-white">{plan.price}</p>
      {plan.badge && <p className="mt-1 text-xs text-emerald-400">{plan.badge}</p>}
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <button onClick={() => onSelect(plan.key)} className="mt-6 w-full rounded-lg bg-brand px-4 py-2 text-white">
        {buttonText}
      </button>
    </motion.div>
  );
}
