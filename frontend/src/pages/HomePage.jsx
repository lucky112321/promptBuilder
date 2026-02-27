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
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-10">
        <p className="text-sm uppercase tracking-widest text-indigo-300">AI Prompt Builder for Creators & Businesses</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white">Generate revenue-focused AI prompts in seconds.</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Like ChatGPT + Notion AI + Canva templates—built for marketers, founders, freelancers, and developers.</p>
        <div className="mt-8 flex gap-3">
          <Link to="/register" className="rounded-lg bg-brand px-5 py-3 text-white">Start Free</Link>
          <Link to="/pricing" className="rounded-lg border border-slate-700 px-5 py-3">View Pricing</Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">1-Click Prompt Starters</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {templates.map((item, idx) => (
            <motion.div key={item} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-white">{item}</p>
              <p className="mt-2 text-sm text-slate-400">Click to auto-fill intent, structure, and conversion-first instructions.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
