import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const templates = [
  { title: 'Launch Offer Prompt', desc: 'Craft high-converting copy for a product launch.' },
  { title: 'Cold Email Prompt', desc: 'Generate B2B outreach sequences that get replies.' },
  { title: 'Ad Copy Prompt', desc: 'Create compelling Facebook & Google ads.' },
  { title: 'YouTube Script Prompt', desc: 'Structure engaging video hooks and content.' }
];

export default function HomePage() {
  return (
    <div className="space-y-24 py-10 pb-20">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brandGlow opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brandGlow"></span>
          </span>
          AI Prompt Builder for Creators & Businesses
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-7xl"
        >
          Generate <span className="text-gradient drop-shadow-sm">revenue-focused</span> AI prompts in seconds.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl"
        >
          Like ChatGPT + Notion AI + Canva templates—built specifically for marketers, founders, freelancers, and developers to scale their impact.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            to="/register" 
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-brand px-8 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              Start Building for Free
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
          </Link>
          <Link 
            to="/pricing" 
            className="group rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
          >
            View Pricing Tiers
          </Link>
        </motion.div>
      </section>

      {/* Templates Section */}
      <section className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">1-Click Prompt Starters</h2>
          <p className="mt-4 text-slate-400">Skip the blinking cursor. Start with proven, conversion-first templates.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {templates.map((item, idx) => (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl glass-card p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-lg bg-brand/10 p-3 text-brand-400 ring-1 ring-brand/20">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{item.desc}</p>
                <div className="mt-6 flex items-center text-sm font-medium text-brand-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                  Try this prompt &rarr;
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
