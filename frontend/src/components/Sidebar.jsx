import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarterCard from './StarterCard';

const starters = [
  { icon: '🚀', title: 'Launch Campaign', prompt: 'Create a launch prompt for a new digital product.' },
  { icon: '✉️', title: 'Cold Outreach', prompt: 'Write a personalized cold email prompt for B2B SaaS.' },
  { icon: '🎥', title: 'Video Script', prompt: 'Build a short-form script prompt with hooks and CTA.' },
  { icon: '💼', title: 'Sales Page', prompt: 'Generate a conversion-focused sales page prompt.' }
];

export default function Sidebar({ user, history, onStarterSelect, mobileOpen, setMobileOpen }) {
  return (
    <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-700 bg-[#111827] p-6 transition-transform duration-300 md:static md:translate-x-0`}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="text-xl font-semibold text-slate-100">Prompt Builder</Link>
          <button onClick={() => setMobileOpen(false)} className="rounded border border-slate-600 px-2 py-1 text-xs text-slate-300 md:hidden">Close</button>
        </div>

        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-wider text-slate-400">Prompt history</h3>
          <div className="mt-3 space-y-2">
            {history.slice(0, 6).map((item, idx) => (
              <div key={`${item}-${idx}`} className="rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2 text-xs text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xs uppercase tracking-wider text-slate-400">Smart Prompt Starters</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {starters.map((starter, idx) => (
              <StarterCard
                key={starter.title}
                starter={starter}
                locked={user?.plan === 'free' && idx > 1}
                onClick={() => onStarterSelect(starter.prompt, user?.plan === 'free' && idx > 1)}
              />
            ))}
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.98 }} className="mt-6 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white">
          Upgrade to Pro
        </motion.button>

        <div className="mt-auto rounded-xl border border-slate-700 bg-[#0B0F14] p-4">
          <p className="text-sm font-semibold text-slate-100">{user?.name || 'Guest'}</p>
          <p className="text-xs uppercase text-slate-400">{user?.plan || 'free'} plan</p>
        </div>
      </div>
    </aside>
  );
}
