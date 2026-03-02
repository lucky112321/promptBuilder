import { motion } from 'framer-motion';

export default function InputBar({ idea, setIdea, category, setCategory, onSubmit, loading }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 border-t border-slate-700 bg-[#111827]/95 p-4 backdrop-blur">
      <form onSubmit={onSubmit} className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your goal, audience, and desired result..."
          className="h-24 flex-1 rounded-xl border border-slate-600 bg-[#0B0F14] p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-indigo-500"
          required
        />
        <div className="flex gap-3 sm:w-56 sm:flex-col">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-600 bg-[#0B0F14] p-3 text-sm text-slate-100 outline-none focus:border-indigo-500"
          >
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="content">Content</option>
            <option value="coding">Coding</option>
          </select>
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Generating...' : 'Generate'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
