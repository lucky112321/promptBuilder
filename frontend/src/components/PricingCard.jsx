import { motion } from 'framer-motion';

export default function PricingCard({ plan, highlighted, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl border p-6 ${
        highlighted
          ? 'border-indigo-400 bg-[#1F2937] shadow-[0_0_30px_rgba(99,102,241,0.2)]'
          : 'border-slate-700 bg-[#111827]'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold text-slate-100">{plan.name}</h3>
      <p className="mt-2 text-3xl font-bold text-white">{plan.price}</p>
      {plan.badge && <p className="mt-2 text-xs font-medium text-emerald-400">{plan.badge}</p>}
      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(plan.key)}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3 font-semibold text-white"
      >
        Choose {plan.name}
      </motion.button>
    </motion.div>
  );
}
