import { useState } from 'react';
import api from '../api/client';
import Sidebar from './Sidebar';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

export default function ChatLayout({ user }) {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState('marketing');
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Prompt Builder. Tell me what you want to create, and I will generate a conversion-ready prompt.' }
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentIdea = idea.trim();
    if (!currentIdea) return;

    const nextMessages = [...messages, { role: 'user', content: currentIdea }];
    setMessages(nextMessages);
    setIdea('');
    setLoading(true);

    try {
      const { data } = await api.post('/prompt/generate', { idea: currentIdea, category });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.prompt }]);
      setUsage(data.usage);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: error.response?.data?.message || 'Failed to generate prompt.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleStarter = (starterText, locked) => {
    if (locked) return;
    setIdea(starterText);
    setMobileOpen(false);
  };

  const userHistory = messages.filter((msg) => msg.role === 'user').map((msg) => msg.content);

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] overflow-hidden rounded-2xl border border-slate-700 bg-[#111827]">
      <Sidebar
        user={user}
        history={userHistory}
        onStarterSelect={handleStarter}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex flex-1 flex-col bg-[#0B0F14]">
        <header className="flex items-center justify-between border-b border-slate-700 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">AI Prompt Workspace</h1>
            <p className="text-xs text-slate-400">Build premium prompts for creators & businesses</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded border border-slate-600 px-3 py-1 text-xs text-slate-300 md:hidden">Menu</button>
            <span className="rounded-full border border-indigo-500/50 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase text-indigo-300">
              {user?.plan || 'free'}
            </span>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.map((message, idx) => (
            <MessageBubble key={`${message.role}-${idx}`} message={message} />
          ))}
          {usage && <p className="text-xs text-slate-400">Daily usage: {usage.promptsUsedToday} / {usage.dailyLimit}</p>}
        </div>

        <InputBar
          idea={idea}
          setIdea={setIdea}
          category={category}
          setCategory={setCategory}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
