import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <input className="mt-4 w-full rounded border border-slate-700 bg-slate-950 p-3" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Name" required />
      <input className="mt-3 w-full rounded border border-slate-700 bg-slate-950 p-3" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" required />
      <input className="mt-3 w-full rounded border border-slate-700 bg-slate-950 p-3" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="Password" required />
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      <button className="mt-4 w-full rounded bg-brand p-3 font-semibold">Start Free</button>
      <p className="mt-4 text-sm text-slate-400">Have an account? <Link to="/login" className="text-indigo-300">Login</Link></p>
    </form>
  );
}
