import PromptGenerator from '../components/PromptGenerator';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h1 className="text-2xl font-bold text-white">Welcome, {user?.name}</h1>
        <p className="mt-2 text-slate-400">Plan: <span className="font-semibold text-indigo-300">{user?.plan || 'free'}</span></p>
      </div>
      <PromptGenerator />
    </section>
  );
}
