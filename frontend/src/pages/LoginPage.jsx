import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/client';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-slate-100">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-400">Sign in to continue building prompts.</p>
      <input className="mt-5 w-full rounded-xl border border-slate-600 bg-[#0B0F14] p-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input className="mt-3 w-full rounded-xl border border-slate-600 bg-[#0B0F14] p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      <motion.button whileTap={{ scale: 0.98 }} className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 p-3 font-semibold text-white">Login</motion.button>
      <p className="mt-4 text-sm text-slate-400">No account? <Link to="/register" className="text-indigo-300">Register</Link></p>
    </form>
  );
}
