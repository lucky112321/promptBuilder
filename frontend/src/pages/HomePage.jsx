import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const templates = [
  'Launch Offer Prompt',
  'Cold Email Prompt',
  'Ad Copy Prompt',
  'YouTube Script Prompt'
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-700 bg-[#111827] p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">AI Prompt Builder for Creators & Businesses</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-100">Minimal workspace. Maximum prompt quality.</h1>
        <p className="mt-4 max-w-2xl text-slate-400">Craft structured, high-conversion prompts with a premium workflow designed for daily execution.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/register" className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 font-semibold text-white">Start Free</Link>
          <Link to="/pricing" className="rounded-xl border border-slate-600 px-5 py-3 text-slate-200">View Pricing</Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-100">Smart Prompt Starters</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-slate-700 bg-[#1F2937] p-5"
            >
              <p className="text-sm font-semibold text-slate-100">{item}</p>
              <p className="mt-2 text-xs text-slate-400">Pre-structured with context, outcomes, and conversion intent.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
