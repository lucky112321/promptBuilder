import { useState, useRef, useEffect, useCallback } from 'react';
import api from '../api/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromptGenerator() {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState('marketing');
  const [result, setResult] = useState('');
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Resize state
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);

  // Responsive default
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setLeftWidth(100); // full width on mobile
    }
  }, []);

  const startResize = useCallback(() => {
    setIsDragging(true);
  }, []);

  const stopResize = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isDragging && containerRef.current) {
        const containerBounds = containerRef.current.getBoundingClientRect();
        
        // Calculate new percentage based on mouse position
        let newWidth = ((mouseMoveEvent.clientX - containerBounds.left) / containerBounds.width) * 100;
        
        // Define limits (e.g., between 25% and 75%)
        if (newWidth < 25) newWidth = 25;
        if (newWidth > 75) newWidth = 75;
        
        setLeftWidth(newWidth);
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none'; // prevent text selection while dragging
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isDragging, resize, stopResize]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/prompt/generate', { idea, category });
      setResult(data.prompt);
      setUsage(data.usage);
      setCopied(false);
    } catch (error) {
      setResult(error.response?.data?.message || 'Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert layout to single column for mobile (<1024px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div 
      ref={containerRef}
      className={`mt-8 ${isMobile ? 'flex flex-col gap-6' : 'flex items-stretch'}`}
      style={isMobile ? {} : { height: '600px' }} // Fixed height on desktop for resizable panes
    >
      {/* Input Section */}
      <div 
        style={{ width: isMobile ? '100%' : `${leftWidth}%` }} 
        className="flex-shrink-0 flex pr-0 lg:pr-3 transition-none h-full"
      >
        <motion.form 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleGenerate} 
          className="glass-card rounded-3xl p-8 shadow-xl relative overflow-hidden flex-1 flex flex-col h-full"
        >
          <div className="absolute top-0 right-0 -m-8 h-32 w-32 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl font-bold tracking-tight text-white mb-6">Create High-Converting Prompt</h3>
          
          <div className="space-y-5 relative flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-slate-300 mb-2">What's your goal?</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="flex-1 min-h-[120px] w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-white placeholder-slate-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all shadow-inner hover:bg-slate-900"
                placeholder="Describe your offer, product, or campaign goal in detail..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <div className="relative">
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 pr-10 text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all hover:bg-slate-900"
                >
                  <option value="marketing">Marketing & Sales</option>
                  <option value="business">Business Strategy</option>
                  <option value="content">Content Creation</option>
                  <option value="coding">Software Development</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <button 
              disabled={loading} 
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 font-bold text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Crafting magic...
                </span>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative flex items-center gap-2 text-[15px]">
                    Generate Prompt
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>

      {/* Draggable Divider (Hidden on Mobile) */}
      {!isMobile && (
        <div 
          className="resizer hidden lg:flex" 
          onMouseDown={startResize}
        />
      )}

      {/* Output Section */}
      <div 
        style={{ width: isMobile ? '100%' : `${100 - leftWidth}%` }} 
        className="flex-shrink-0 flex pl-0 lg:pl-3 transition-none h-full"
      >
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col h-full flex-1"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Result
              {result && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
            </h3>
            
            <AnimatePresence>
              {result && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white ring-1 ring-inset ring-slate-700"
                >
                  {copied ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Copy
                    </span>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 rounded-xl bg-slate-950/80 border border-slate-800 p-1 relative overflow-hidden group min-h-[200px]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brandAccent to-brandGlow opacity-50" />
            <pre className="h-full overflow-auto whitespace-pre-wrap p-5 text-sm leading-relaxed text-emerald-300 relative z-10 custom-scrollbar">
              {result || (
                <div className="flex h-full flex-col items-center justify-center text-slate-500 gap-3">
                  <svg className="h-10 w-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  <span className="text-center font-medium">Your highly-optimized prompt<br/>will appear here.</span>
                </div>
              )}
            </pre>
          </div>
          
          {usage && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-shrink-0 items-center justify-between border-t border-slate-800 pt-4">
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Usage today: <span className="font-bold text-slate-200">{usage.promptsUsedToday}</span> / {usage.dailyLimit}
              </p>
              <span className="rounded bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
                {usage.plan} plan
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
