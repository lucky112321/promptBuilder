import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import Sidebar from './Sidebar';
import PromptPanel from './PromptPanel';
import PromptOutput from './PromptOutput';

export default function ChatLayout({ user }) {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState('marketing');
  const [result, setResult] = useState('');
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    const trimmedIdea = idea.trim();
    if (!trimmedIdea) return;

    setLoading(true);

    try {
      const { data } = await api.post('/prompt/generate', { idea: trimmedIdea, category });
      setResult(data.prompt);
      setUsage(data.usage);
      setHistory((prev) => [trimmedIdea, ...prev.filter((item) => item !== trimmedIdea)]);
    } catch (error) {
      setResult(error.response?.data?.message || 'Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleStarterPick = (text) => {
    setIdea(text);
    setMobileOpen(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-5.25rem)] overflow-hidden rounded-2xl border border-[#2D3748] bg-[#0B0F19]">
      <Sidebar
        user={user}
        history={history}
        onStarterPick={handleStarterPick}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="md:ml-[260px]">
        <header className="flex items-center justify-between border-b border-[#2D3748] px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-semibold text-[#F9FAFB]">Prompt Workspace</h1>
            <p className="text-xs text-gray-400">Design premium prompts for your business goals.</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg border border-gray-700 px-3 py-1 text-xs text-gray-300 md:hidden"
          >
            Menu
          </button>
        </header>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 p-4 md:grid-cols-2 md:p-6">
          <PromptPanel
            idea={idea}
            setIdea={setIdea}
            category={category}
            setCategory={setCategory}
            onGenerate={handleGenerate}
            loading={loading}
          />
          <PromptOutput result={result} usage={usage} />
        </motion.div>
      </div>
    </div>
  );
}
