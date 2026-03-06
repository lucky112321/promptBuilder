import { motion } from 'framer-motion';

export default function StarterCard({ starter, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-lg border border-gray-700 bg-[#1F2937] p-3 text-left transition-all hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="text-base">{starter.icon}</div>
      <p className="mt-1 text-xs font-semibold text-[#F9FAFB]">{starter.title}</p>
      <p className="mt-1 text-[11px] text-gray-400">{starter.description}</p>
    </motion.button>
  );
}
