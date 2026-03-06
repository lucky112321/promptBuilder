import { motion } from 'framer-motion';

export default function UpgradeButton({ className = '' }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 ${className}`}
    >
      Upgrade Plan
    </motion.button>
  );
}
