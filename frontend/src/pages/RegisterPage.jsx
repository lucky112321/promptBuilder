import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/client';
import { useAuth } from '../hooks/useAuth';

const getErrorMessage = (err) => {
  if (err.response?.data?.message) return err.response.data.message;
  if (err.code === 'ERR_NETWORK') return 'Unable to connect to server. Please check API URL and backend status.';
  return 'Registration failed';
};

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      };

      const { data } = await api.post('/auth/register', payload);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-slate-100">Create your account</h1>
      <p className="mt-1 text-sm text-slate-400">Start free and upgrade when you're ready.</p>
      <input className="mt-5 w-full rounded-xl border border-slate-600 bg-[#0B0F14] p-3" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Name" required />
      <input className="mt-3 w-full rounded-xl border border-slate-600 bg-[#0B0F14] p-3" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" required />
      <input className="mt-3 w-full rounded-xl border border-slate-600 bg-[#0B0F14] p-3" type="password" minLength={6} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="Password (min 6 characters)" required />
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      <motion.button type="submit" whileTap={{ scale: 0.98 }} disabled={submitting} className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70">{submitting ? 'Creating account...' : 'Start Free'}</motion.button>
      <p className="mt-4 text-sm text-slate-400">Have an account? <Link to="/login" className="text-indigo-300">Login</Link></p>
    </form>
  );
}
