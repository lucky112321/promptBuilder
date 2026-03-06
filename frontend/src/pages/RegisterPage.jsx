import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 glass-card rounded-3xl p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -m-8 h-32 w-32 rounded-full bg-brandAccent/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -m-8 h-32 w-32 rounded-full bg-brandGlow/20 blur-3xl" />
        
        <div className="relative">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Start building AI prompts like a pro
          </p>
        </div>
        
        <form className="mt-8 space-y-6 relative" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input 
                type="text" 
                value={form.name} 
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} 
                required 
                className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all hover:bg-slate-900" 
                placeholder="Jane Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
              <input 
                type="email" 
                value={form.email} 
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} 
                required 
                className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all hover:bg-slate-900" 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                value={form.password} 
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} 
                required 
                className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all hover:bg-slate-900" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-center">
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="group relative flex w-full justify-center rounded-xl bg-brand px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Start building for free'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-slate-400 relative">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-400 hover:text-brand-300 transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
