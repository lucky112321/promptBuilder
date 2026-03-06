import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-xl border border-gray-800 bg-[#111827] p-6 transition-all hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="mb-4 inline-flex rounded-lg border border-indigo-400/20 bg-indigo-500/10 p-2 text-lg">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#F9FAFB]">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </motion.div>
  );
}
