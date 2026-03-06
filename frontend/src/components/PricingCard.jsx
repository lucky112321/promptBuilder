import { motion } from 'framer-motion';

export default function PricingCard({ plan, highlighted, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl border p-6 ${
        highlighted
          ? 'border-indigo-400/70 bg-[#1F2937] shadow-xl shadow-indigo-500/20'
          : 'border-[#2D3748] bg-[#111827]'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold text-[#F9FAFB]">{plan.name}</h3>
      <p className="mt-2 text-3xl font-bold text-white">{plan.price}</p>
      {plan.badge && <p className="mt-2 text-xs font-medium text-emerald-400">{plan.badge}</p>}
      <ul className="mt-5 space-y-2 text-sm text-gray-300">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(plan.key)}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20"
      >
        Choose {plan.name}
      </motion.button>
    </motion.div>
  );
}
