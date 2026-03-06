import PromptGenerator from '../components/PromptGenerator';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 to-slate-900 p-8 shadow-2xl glass-card"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-brandGlow/20 blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back, <span className="text-gradient drop-shadow-sm">{user?.name?.split(' ')[0] || 'Creator'}</span> 👋
            </h1>
            <p className="mt-2 text-lg text-slate-300">Ready to build some high-converting prompts today?</p>
          </div>
          
          <div className="flex items-center gap-4 rounded-xl bg-slate-950/50 p-4 backdrop-blur ring-1 ring-inset ring-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/20 text-brand-300 ring-1 ring-brand/30">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Current Plan</p>
              <p className="text-lg font-bold text-white uppercase tracking-wider">{user?.plan || 'free'}</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <PromptGenerator />
    </section>
  );
}
