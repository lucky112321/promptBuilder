import { useState } from 'react';
import api from '../api/client';

export default function PromptGenerator() {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState('marketing');
  const [result, setResult] = useState('');
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/prompt/generate', { idea, category });
      setResult(data.prompt);
      setUsage(data.usage);
    } catch (error) {
      setResult(error.response?.data?.message || 'Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="text-xl font-semibold text-white">Create High-Converting Prompt</h3>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="mt-4 h-40 w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
          placeholder="Describe your offer, product, or campaign goal..."
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 p-3">
          <option value="marketing">Marketing</option>
          <option value="business">Business</option>
          <option value="content">Content</option>
          <option value="coding">Coding</option>
        </select>
        <button disabled={loading} className="mt-4 rounded-lg bg-brand px-4 py-2 text-white">
          {loading ? 'Generating...' : 'Generate Prompt'}
        </button>
      </form>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="text-xl font-semibold text-white">Generated Prompt</h3>
        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-sm text-emerald-300">
          {result || 'Your formatted prompt appears here in code block style.'}
        </pre>
        {usage && (
          <p className="mt-3 text-xs text-slate-400">
            Usage today: {usage.promptsUsedToday} / {usage.dailyLimit} ({usage.plan} plan)
          </p>
        )}
      </div>
    </div>
  );
}
