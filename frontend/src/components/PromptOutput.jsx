import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PromptOutput({ result, usage }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <section className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#F9FAFB]">Generated Prompt</h2>
          <p className="mt-1 text-sm text-gray-400">Copy and paste directly into your LLM workflow.</p>
        </div>
        <motion.button
          type="button"
          onClick={handleCopy}
          whileTap={{ scale: 0.96 }}
          className="rounded-lg border border-gray-700 bg-[#0B0F19] px-3 py-1.5 text-xs text-gray-300 hover:border-indigo-400/50"
        >
          {copied ? 'Copied' : 'Copy'}
        </motion.button>
      </div>

      <div className="mt-4 max-h-[390px] overflow-auto rounded-xl border border-gray-800 bg-[#020617] p-6">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-emerald-300">
          {result || 'Your generated prompt will appear here in code-style format.'}
        </pre>
      </div>

      {usage && (
        <p className="mt-3 text-xs text-gray-400">
          Usage today: {usage.promptsUsedToday} / {usage.dailyLimit} · Plan: {usage.plan}
        </p>
      )}
    </section>
  );
}
