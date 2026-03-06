import { motion } from 'framer-motion';

const categories = [
  { label: 'Marketing', value: 'marketing' },
  { label: 'Business', value: 'business' },
  { label: 'Content', value: 'content' },
  { label: 'Coding', value: 'coding' }
];

export default function PromptPanel({ idea, setIdea, category, setCategory, onGenerate, loading }) {
  return (
    <section className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="text-xl font-semibold text-[#F9FAFB]">Prompt Generator</h2>
      <p className="mt-2 text-sm text-gray-400">Describe what you need and generate an AI-ready prompt.</p>

      <form onSubmit={onGenerate} className="mt-6 space-y-4">
        <div>
          <label htmlFor="category" className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-sm text-[#F9FAFB] outline-none focus:border-indigo-400"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="idea" className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
            Idea
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: Create a product launch prompt for a new AI course for freelancers..."
            className="h-48 w-full rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-sm text-[#F9FAFB] outline-none placeholder:text-gray-500 focus:border-indigo-400"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Generating Prompt...' : 'Generate Prompt'}
        </motion.button>
      </form>
    </section>
  );
}
