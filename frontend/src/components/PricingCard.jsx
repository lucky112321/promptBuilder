import { motion } from 'framer-motion';

export default function PricingCard({ plan, highlighted, onSelect, buttonText = 'Choose Plan', index = 0 }) {
  const priceParts = plan.price.split('/');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-3xl p-8 transition-shadow duration-300 ${
        highlighted 
        ? 'bg-slate-900 border-2 border-brand/50 shadow-[0_0_30px_rgba(79,70,229,0.15)] relative z-10' 
        : 'glass-card border border-slate-800'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-max rounded-full bg-gradient-to-r from-brand to-brandAccent px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
      <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
        {priceParts[0]}
        <span className="ml-1 text-xl font-medium text-slate-400">/{priceParts[1] || 'month'}</span>
      </div>
      {plan.badge && <p className="mt-3 inline-block rounded bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">{plan.badge}</p>}
      
      <ul className="mt-8 space-y-4 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <svg className="h-5 w-5 shrink-0 text-brand" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => onSelect(plan.key)} 
        className={`mt-8 w-full rounded-xl px-4 py-3 font-semibold transition-all ${
          highlighted 
          ? 'bg-brand text-white hover:bg-brand/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]' 
          : 'bg-white/5 text-white hover:bg-white/10 ring-1 ring-inset ring-white/10'
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}
