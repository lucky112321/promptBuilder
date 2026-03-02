import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CodeBlock({ content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="relative rounded-2xl border border-slate-700 bg-[#0B0F14] p-4">
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700"
      >
        {copied ? 'Copied' : 'Copy'}
      </motion.button>
      <pre className="overflow-x-auto whitespace-pre-wrap pr-14 font-mono text-sm leading-relaxed text-emerald-300">
        {content || 'AI response will appear here in premium code block format.'}
      </pre>
    </div>
  );
}
