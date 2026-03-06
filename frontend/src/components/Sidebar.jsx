import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarterCard from './StarterCard';
import UpgradeButton from './UpgradeButton';

const starters = [
  { icon: '🚀', title: 'Launch Offer', description: 'Build a launch prompt with angle, audience and CTA.' },
  { icon: '✍️', title: 'Ad Copy', description: 'Generate high-converting ad prompt with variants.' },
  { icon: '📧', title: 'Cold Outreach', description: 'Create persuasive B2B email prompt frameworks.' },
  { icon: '🎬', title: 'Video Script', description: 'Craft hook-driven short video script prompts.' }
];

export default function Sidebar({ user, history, onStarterPick, mobileOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-[260px] border-r border-[#2D3748] bg-[#111827] p-4 transition-transform duration-300 md:static md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between pb-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-[#F9FAFB]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20">⚡</span>
            PromptBuilder
          </Link>
          <button type="button" onClick={onClose} className="text-xs text-gray-400 md:hidden">
            Close
          </button>
        </div>

        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-widest text-gray-500">Prompt History</p>
          <div className="mt-2 space-y-2">
            {history.length ? (
              history.slice(0, 7).map((item, index) => (
                <motion.button
                  key={`${item}-${index}`}
                  type="button"
                  whileHover={{ x: 2 }}
                  onClick={() => onStarterPick(item)}
                  className="w-full rounded-lg border border-transparent bg-[#0B0F19] px-3 py-2 text-left text-xs text-gray-300 hover:border-indigo-400/30"
                >
                  {item.slice(0, 60)}
                </motion.button>
              ))
            ) : (
              <p className="rounded-lg bg-[#0B0F19] px-3 py-2 text-xs text-gray-500">No prompts yet.</p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-widest text-gray-500">Smart Prompt Starters</p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            {starters.map((starter) => (
              <StarterCard key={starter.title} starter={starter} onClick={() => onStarterPick(starter.description)} />
            ))}
          </div>
        </div>

        <UpgradeButton className="mt-5" />

        <div className="mt-auto rounded-xl border border-gray-700 bg-[#0B0F19] p-3">
          <p className="text-sm font-medium text-[#F9FAFB]">{user?.name || 'Guest'}</p>
          <p className="text-xs uppercase tracking-wide text-gray-400">{user?.plan || 'free'} plan</p>
        </div>
      </div>
    </aside>
  );
}
