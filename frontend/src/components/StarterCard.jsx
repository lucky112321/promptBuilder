import { motion } from 'framer-motion';

export default function StarterCard({ starter, locked, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
      className="group relative rounded-xl border border-slate-700 bg-[#1F2937] p-4 text-left transition-shadow hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <p className="text-lg">{starter.icon}</p>
      <h4 className="mt-1 text-sm font-semibold text-slate-100">{starter.title}</h4>
      <p className="mt-1 text-xs text-slate-400">{starter.prompt}</p>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#0B0F14]/70 backdrop-blur-[1px]">
          <p className="rounded-full border border-slate-500 px-3 py-1 text-xs font-semibold text-slate-200">🔒 Unlock PRO</p>
        </div>
      )}
    </motion.button>
  );
}
